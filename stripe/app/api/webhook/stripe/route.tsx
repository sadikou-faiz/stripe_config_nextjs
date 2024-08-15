import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

// Initialisation de l'instance Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
// Chargement de la clé secrète du webhook Stripe depuis les variables d'environnement
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {

  // Extraction du corps de la requête en tant que texte brut
  const body = await req.text();
  // Récupération de la signature Stripe depuis les en-têtes de la requête
  const signature = headers().get('stripe-signature');

  // Vérification si la signature est présente dans les en-têtes
  if (!signature) {
    console.error('La signature du webhook est manquante.');
    return new Response(JSON.stringify({ error: 'Webhook signature missing' }), { status: 400 });
  }

  let event;

  try {
    // Construction de l'événement Stripe à partir du corps, de la signature et de la clé secrète
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret ?? "");
  } catch (err: any) {
    // Gestion des erreurs liées à la vérification de la signature
    console.error(`Échec de la vérification de la signature du webhook. ${err.message}`);
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }

  // Extraction des données et du type d'événement
  const { data, type: eventType } = event;

  try {
    // Gestion des différents types d'événements Stripe
    switch (eventType) {
      // Traitement de l'événement de session de paiement complété
      case 'checkout.session.completed': {
        console.log('Handling checkout.session.completed event...');
        const session = data.object as Stripe.Checkout.Session;
      
        if (!session.customer) {
          throw new Error('Customer ID manquant dans la session');
        }
      
        const customerId = session.customer as string;
        console.log("Customer ID:", customerId);
        
        // Récupération des informations du client depuis Stripe
        const customer = await stripe.customers.retrieve(customerId);
      
        if ('deleted' in customer) {
          throw new Error('Le client est supprimé');
        }
      
        if (!customer.email) {
          throw new Error('Aucun email client fourni');
        }
      
        console.log(`Customer retrieved: ${JSON.stringify(customer)}`);
      
        // Recherche de l'utilisateur dans la base de données
        let user = await prisma.user.findUnique({ where: { email: customer.email } });
      
        // Vérification si l'utilisateur existe et s'il est actif
        if (user && user.isActive) {
          throw new Error('Un abonnement est déjà actif pour cet utilisateur.');
        }
      
        // Si l'utilisateur n'existe pas encore, création d'un nouvel utilisateur
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: customer.email,
              stripeCustomerId: customerId,
              subscriptionID: session.subscription as string, // Enregistrement de l'ID de l'abonnement
              isActive: true
            }
          });
          console.log(`New user created: ${JSON.stringify(user)}`);
        } else {
          // Mise à jour des informations de l'utilisateur existant
          const updatedUser = await prisma.user.update({
            where: { email: customer.email },
            data: {
              stripeCustomerId: customerId,
              subscriptionID: session.subscription as string, // Mise à jour de l'ID de l'abonnement
              isActive: true
            }
          });
          console.log(`Utilisateur mis à jour: ${JSON.stringify(updatedUser)}`);
        }
        break;
      }

      // Traitement de l'événement de suppression d'abonnement
      case 'customer.subscription.deleted': {
        console.log('Handling customer.subscription.deleted event...');
        const subscription = data.object as Stripe.Subscription;

        if (!subscription.customer) {
          throw new Error("Informations d'abonnement manquantes");
        }

        const customerId = subscription.customer as string;

        // Recherche de l'utilisateur associé au client dans la base de données
        const user = await prisma.user.findUnique({ where: { stripeCustomerId: customerId } });

        if (!user) {
          console.error(`Utilisateur non trouvé pour le client avec ID: ${customerId}`);
          throw new Error('Utilisateur non trouvé pour ce client');
        }

        // Mise à jour des informations de l'utilisateur pour refléter la suppression de l'abonnement
        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: {
            isActive: false,
            subscriptionID: null
          }
        });

        console.log(`Abonnement supprimé pour l'utilisateur: ${JSON.stringify(updatedUser)}`);

        break;
      }
      // Gestion des événements non pris en charge
      default:
        console.error(`Type d'événement non géré: ${eventType}`);
    }



    
  } catch (e) {
    // Gestion des erreurs générales
    if (e instanceof Error) {
      console.error(`Erreur Stripe: ${e.message} | Type d'événement: ${eventType}`);
      return new Response(JSON.stringify({ error: e.message }), { status: 400 });
    } else {
      console.error(`Erreur inconnue: ${e}`);
      return new Response(JSON.stringify({ error: 'Erreur inconnue' }), { status: 400 });
    }
  }

  // Réponse réussie pour le webhook
  return new Response(JSON.stringify({}));
}
