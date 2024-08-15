export const plans = [
    {
        link: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_5kA3cV4PS6vt6as28c' : '',
        priceId: process.env.NODE_ENV === 'development' ? 'price_1PnLFx2KRuBKS7Wnkq0XdaeK' : '',
        price: 7,
        duration: '/month'
    },
    {
        link: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_3cs00Jbeg1b92YgeUZ' : '',
        priceId: process.env.NODE_ENV === 'development' ? 'price_1PnLGh2KRuBKS7Wn1s3Oh4ag' : '',

        price: 70,
        duration: '/year'
    }
];