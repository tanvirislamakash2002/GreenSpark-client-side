import { Roles } from "./roles";

export const routeConfig = {
    admin: {
        dashboard: "/dashboard/admin",
        profile: "/dashboard/admin/profile",
        ideas: "/dashboard/admin/ideas",
        pending: "/dashboard/admin/ideas/pending",
        approved: "/dashboard/admin/ideas/approved",
        rejected: "/dashboard/admin/ideas/rejected",
        users: "/dashboard/admin/users",
        categories: "/dashboard/admin/categories",
        comments: "/dashboard/admin/comments",
        settings: "/dashboard/admin/settings",
    },
    member: {
        dashboard: "/dashboard/member",
        profile: "/dashboard/member/profile",
        ideas: "/dashboard/member/ideas",
        createIdea: "/dashboard/member/ideas/create",
        editIdea: "/dashboard/member/ideas/edit",
        drafts: "/dashboard/member/ideas/drafts",
        bookmarks: "/dashboard/member/bookmarks",
        votes: "/dashboard/member/votes",
        comments: "/dashboard/member/comments",
        notifications: "/dashboard/member/notifications",
        payments: "/dashboard/member/payments",
        settings: "/dashboard/member/settings",
    },
};

export const getDashboardRoute = (role: string): string => {
    if (role === Roles.ADMIN) {
        return routeConfig.admin.dashboard;
    } else if (role === Roles.MEMBER) {
        return routeConfig.member.dashboard;
    }
    return "/";
};

export const getProfileRoute = (role: string): string => {
    if (role === Roles.ADMIN) {
        return routeConfig.admin.profile;
    } else if (role === Roles.MEMBER) {
        return routeConfig.member.profile;
    }
    return "/profile";
};

export const isActiveRoute = (pathname: string, routeUrl: string): boolean => {
    if (routeUrl === "/") return pathname === routeUrl;

    // Get the base path (e.g., "/dashboard/admin" from "/dashboard/admin/ideas")
    const basePath = `/${pathname.split('/')[1]}/${pathname.split('/')[2] || ''}`.replace(/\/$/, '');
    
    // Handle dashboard base paths
    if (routeUrl === "/dashboard/admin" && basePath === "/dashboard/admin") {
        return pathname === routeUrl || pathname.startsWith(routeUrl + "/");
    }
    if (routeUrl === "/dashboard/member" && basePath === "/dashboard/member") {
        return pathname === routeUrl || pathname.startsWith(routeUrl + "/");
    }

    if (routeUrl === basePath) {
        return pathname === routeUrl;
    }

    return pathname.startsWith(routeUrl);
};