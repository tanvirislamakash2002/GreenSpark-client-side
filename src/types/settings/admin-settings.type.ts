export interface AdminProfile {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: string;
    accountStatus: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdminActivity {
    id: string;
    action: string;
    details: any;
    ipAddress: string;
    createdAt: string;
}

export interface NotificationPreferences {
    newIdeaSubmissions: boolean;
    pendingReviewReminders: boolean;
    reportedContent: boolean;
    weeklySummary: boolean;
    systemAnnouncements: boolean;
}

export interface Session {
    id: string;
    userAgent: string;
    ipAddress: string;
    createdAt: string;
    expiresAt: string;
    isCurrent: boolean;
}

export interface ActivityLogResponse {
    activities: AdminActivity[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}