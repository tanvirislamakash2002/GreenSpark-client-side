export interface Subscriber {
    id: string;
    email: string;
    isSubscribed: boolean;
    subscribedAt: string;
    unsubscribedAt: string | null;
    userId: string | null;
    user?: {
        name: string;
        image: string | null;
    };
}

export interface SubscribersResponse {
    success: boolean;
    data?: {
        subscribers: Subscriber[];
        stats: {
            totalSubscribers: number;
            activeSubscribers: number;
            unsubscribed: number;
            newThisMonth: number;
        };
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
        };
    };
    message?: string;
}

export interface Campaign {
    id: string;
    subject: string;
    content: string;
    recipients: number;
    sentAt: string;
    status: 'DRAFT' | 'SENT' | 'SCHEDULED';
    openRate?: number;
    clickRate?: number;
}

export interface SendNewsletterData {
    subject: string;
    content: string;
    sendTo: 'all' | 'active' | 'segment';
    scheduleAt?: string;
}