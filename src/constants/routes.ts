import { Roles } from "./roles";

export const routeConfig = {
    admin: {
        dashboard: "/admin",
        profile: "/admin/profile",
        ideas: "/admin/ideas",
        pending: "/admin/ideas/pending",
        approved: "/admin/ideas/approved",
        rejected: "/admin/ideas/rejected",
        users: "/admin/users",
        categories: "/admin/categories",
        comments: "/admin/comments",
        settings: "/admin/settings",
    },
    member: {
        dashboard: "/member",
        profile: "/member/profile",
        ideas: "/member/ideas",
        createIdea: "/member/ideas/create",
        editIdea: "/member/ideas/edit",
        drafts: "/member/ideas/drafts",
        bookmarks: "/member/bookmarks",
        votes: "/member/votes",
        comments: "/member/comments",
        notifications: "/member/notifications",
        payments: "/member/payments",
        settings: "/member/settings",
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