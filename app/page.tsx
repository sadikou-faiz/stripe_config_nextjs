
import { plans } from '@/plans';

type Plan = {
    price: number;
    duration: string;
    link: string;
};


export default function Home() {
  return (
      <div>
        <p>princing</p>
        <section id="pricing" className='p-5 md:p-0  text-white'>
            <div className="pt-4 max-w-5xl mx-auto">
                <div className="flex flex-col text-center w-full mb-5">
             
                    <h2 className="font-bold text-md text-white tracking-tight">
                        Your user&apos;s feedback is priceless.
                    </h2>
                </div>

                <div className="relative flex flex-col md:flex-row justify-center gap-4 ">
          
                        <div className="w-full md:w-[350px] max-w-lg bg-black rounded-lg">
                            <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-base-200 p-8 rounded-xl">
                                <div className="flex gap-2">
                                    <p className="text-white text-5xl tracking-tight font-extrabold">
                                        0 €
                                    </p>
                                    <div className="flex flex-col justify-end mb-[4px]">
                                        <p className="text-sm tracking-wide text-base-content/80 uppercase font-semibold">
                                            FREE
                                        </p>
                                    </div>
                                </div>
                                <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                                    {[
    '5 projets',
    '10 tâches par projet',
    'Rapports basiques',
    'Intégrations limitées',
    'Support par e-mail'
]
.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-[18px] h-[18px] opacity-80 shrink-0"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className='text-sm'>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="space-y-2">
                                <button className=" bg-blue-500 w-full p-3 rounded-lg">
                                    <a
                                        className="btn btn-primary btn-block"
                                        target="_blank"
                                        href="/home"
                                    >
                                        GO (C'est gratuit)
                                    </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                   

                    {plans.map((plan, index) => (
                        <div key={index} className="w-full md:w-[350px] flex justify-between bg-black rounded-lg">
                            <div className="relative flex flex-col gap-5 lg:gap-8 z-10 bg-base-200 p-8 rounded-xl w-full">
                                <div className="flex gap-2">
                                    <p className="text-white text-5xl tracking-tight font-extrabold">
                                        {plan.price} €
                                    </p>
                                    <div className="flex flex-col justify-end mb-[4px]">
                                        <p className="text-sm tracking-wide text-base-content/80 uppercase font-semibold">
                                            {plan.duration === '/month' ? 'Monthly' : 'Yearly'}
                                        </p>
                                    </div>
                                </div>
                                <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                                    {plan.duration === '/year' && (
                                        <li className="flex items-center gap-2 text-primary font-bold">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-[18px] h-[18px] opacity-80 shrink-0"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.704 4.153a.75.75 0 011.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            2 mois gratuits
                                        </li>
                                    )}
                                    {[
    'Projets illimités',
    'Tâches illimitées',
    'Rapports avancés',
    'Intégrations complètes',
    'Support prioritaire',
    'Collaboration en temps réel'
].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-[18px] h-[18px] opacity-80 shrink-0"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.704 4.153a.75.75 0 011.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className='text-sm text-white'>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="space-y-2">
                                  <button className=" bg-blue-500 w-full p-3 rounded-lg">
                                   <a
                                        className="btn  "
                                        target="_blank"
                                        href={plan.link}
                               
                                    >
                                        S'abonner
                                    </a>
                                  </button>
                                   
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </div>
  );
}
