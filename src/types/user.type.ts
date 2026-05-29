export interface User {
    id: string;
    name: string;
    email: string;
    role: "MEMBER" | "ADMIN";
    accountStatus: "ACTIVE" | "SUSPENDED" | "BANNED";
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    _count?: {
        ideas: number;
        comments: number;
        votes: number;
    };
    lastActive?: string;
}

export interface UserStats {
    totalUsers: number;
    activeUsers: number;
    suspendedUsers: number;
    bannedUsers: number;
    adminUsers: number;
    memberUsers: number;
    verifiedEmails: number;
    unverifiedEmails: number;
    newUsersThisMonth: number;
    newUsersTrend: number;
}

export interface UserFilters {
    role?: string;
    status?: string;
    verified?: string;
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
}

export interface UsersResponse {
    users: User[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
    stats?: UserStats;
}