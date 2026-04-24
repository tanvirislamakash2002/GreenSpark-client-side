import { PricingPlan, PricingFeature, FAQ } from '@/types/pricing.type';

export const pricingPlans: PricingPlan[] = [
    {
        id: 'free',
        name: 'Community Member',
        slug: 'free',
        priceMonthly: 0,
        priceYearly: 0,
        description: 'Access free ideas and join our sustainability community.',
        features: [
            'Browse all free ideas',
            'Submit your own ideas',
            'Upvote and downvote ideas',
            'Comment on ideas',
            'Basic search & filters',
            'Bookmark favorite ideas',
        ],
        notIncluded: [
            'Access to paid/premium ideas',
            'Priority support',
            'Early access to new features',
        ],
        isPopular: false,
        buttonText: 'Get Started',
        buttonLink: '/register',
    },
    {
        id: 'premium',
        name: 'Premium',
        slug: 'premium',
        priceMonthly: 9.99,
        priceYearly: 99.00,
        description: 'Unlock all premium ideas and get priority support.',
        features: [
            'Everything in Community Member',
            'Unlimited access to paid ideas',
            'Priority voting weight',
            'Early access to new features',
            'Priority email support',
            'Ad-free experience',
            'Download ideas as PDF',
        ],
        notIncluded: [],
        isPopular: true,
        buttonText: 'Subscribe Now',
        buttonLink: '/checkout/premium',
    },
    {
        id: 'enterprise',
        name: 'Community Hero',
        slug: 'enterprise',
        priceMonthly: 0,
        priceYearly: 0,
        description: 'For organizations and changemakers with custom needs.',
        features: [
            'Everything in Premium',
            'Team accounts (up to 10)',
            'API access',
            'Dedicated account manager',
            'Featured organization badge',
            'Analytics dashboard',
            'Custom integrations',
        ],
        notIncluded: [],
        isPopular: false,
        buttonText: 'Contact Sales',
        buttonLink: '/contact',
    },
];

export const featureComparison: PricingFeature[] = [
    { feature: 'Browse free ideas', free: true, premium: true, enterprise: true },
    { feature: 'Submit sustainability ideas', free: true, premium: true, enterprise: true },
    { feature: 'Upvote & downvote', free: true, premium: true, enterprise: true },
    { feature: 'Comment on ideas', free: true, premium: true, enterprise: true },
    { feature: 'Bookmark ideas', free: true, premium: true, enterprise: true },
    { feature: 'Access paid/premium ideas', free: false, premium: true, enterprise: true },
    { feature: 'Download ideas as PDF', free: false, premium: true, enterprise: true },
    { feature: 'Priority voting weight', free: false, premium: true, enterprise: true },
    { feature: 'Priority support', free: false, premium: true, enterprise: true },
    { feature: 'Early access to features', free: false, premium: true, enterprise: true },
    { feature: 'Team accounts', free: false, premium: false, enterprise: 'Up to 10' },
    { feature: 'API access', free: false, premium: false, enterprise: true },
    { feature: 'Analytics dashboard', free: false, premium: false, enterprise: true },
    { feature: 'Dedicated account manager', free: false, premium: false, enterprise: true },
];

export const pricingFAQ: FAQ[] = [
    {
        id: '1',
        question: 'What are paid ideas?',
        answer: 'Paid ideas are premium sustainability solutions that require a subscription to view full details. These ideas often include in-depth research, implementation guides, and exclusive content from experts.',
    },
    {
        id: '2',
        question: 'Can I cancel my subscription anytime?',
        answer: 'Yes, you can cancel your subscription at any time from your dashboard. Your premium access will continue until the end of your current billing period.',
    },
    {
        id: '3',
        question: 'Is there a free trial for Premium?',
        answer: 'Yes, new users get a 7-day free trial of Premium. No payment required to start the trial. Cancel anytime during the trial period.',
    },
    {
        id: '4',
        question: 'What payment methods do you accept?',
        answer: 'We accept credit cards (Visa, MasterCard, American Express), debit cards, and mobile banking through SSLCommerz and Stripe payment gateways.',
    },
    {
        id: '5',
        question: 'How does voting work for premium members?',
        answer: 'All members have equal voting power on ideas. Premium members get early access to new features and priority support, but voting remains democratic for everyone.',
    },
    {
        id: '6',
        question: 'Can I switch between plans?',
        answer: 'Yes, you can upgrade or downgrade your plan anytime from your account settings. Changes take effect immediately for upgrades, but at the next billing cycle for downgrades.',
    },
    {
        id: '7',
        question: 'Is my payment information secure?',
        answer: 'Absolutely. We use SSLCommerz and Stripe for secure payment processing. Your payment information is never stored on our servers.',
    },
    {
        id: '8',
        question: 'Do you offer refunds?',
        answer: 'We offer a 30-day money-back guarantee for all Premium subscriptions. If you\'re not satisfied, contact us for a full refund within 30 days of purchase.',
    },
];

export const getPlanById = (id: string): PricingPlan | undefined => {
    return pricingPlans.find(plan => plan.id === id);
};