"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import {
    LogOut,
    ChevronRight,
    User,
    LayoutDashboard,
    Lightbulb,
    PlusCircle,
    FileText,
    Bookmark,
    ThumbsUp,
    MessageSquare,
    Bell,
    Settings,
    CreditCard,
    Users,
    Clock,
    CheckCircle,
    XCircle,
    Flag,
    Tag,
    BarChart3,
    Mail,
    Activity,
    HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Roles } from "@/constants/roles";
import { getProfileRoute, isActiveRoute } from "@/constants/routes";
import { User as UserType } from "@/types";
import { authClient } from "@/lib/auth-client";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user: UserType;
}

// Member Routes
const memberRoutes = [
    {
        title: "Overview",
        items: [
            { title: "Dashboard", url: "/dashboard/member", icon: LayoutDashboard },
        ],
    },
    {
        title: "Ideas",
        items: [
            { title: "My Ideas", url: "/dashboard/member/ideas", icon: Lightbulb },
            { title: "Create Idea", url: "/dashboard/member/ideas/create", icon: PlusCircle },
            { title: "Drafts", url: "/dashboard/member/ideas/drafts", icon: FileText },
            { title: "Bookmarks", url: "/dashboard/member/bookmarks", icon: Bookmark },
        ],
    },
    {
        title: "Activity",
        items: [
            { title: "My Votes", url: "/dashboard/member/votes", icon: ThumbsUp },
            { title: "My Comments", url: "/dashboard/member/comments", icon: MessageSquare },
            { title: "Notifications", url: "/dashboard/member/notifications", icon: Bell },
        ],
    },
    {
        title: "Account",
        items: [
            { title: "Profile", url: "/dashboard/member/profile", icon: User },
            { title: "Payments", url: "/dashboard/member/payments", icon: CreditCard },
            { title: "Settings", url: "/dashboard/member/settings", icon: Settings },
        ],
    },
    {
        title: "Support",
        items: [
            { title: "Help & Support", url: "/dashboard/member/help", icon: HelpCircle },
        ],
    },
];

// Admin Routes
const adminRoutes = [
    {
        title: "Overview",
        items: [
            { title: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
            { title: "Analytics", url: "/dashboard/admin/analytics", icon: BarChart3 },
        ],
    },
    {
        title: "Idea Management",
        items: [
            { title: "All Ideas", url: "/dashboard/admin/ideas", icon: Lightbulb },
            { title: "Pending Approval", url: "/dashboard/admin/ideas/pending", icon: Clock },
            { title: "Approved Ideas", url: "/dashboard/admin/ideas/approved", icon: CheckCircle },
            { title: "Rejected Ideas", url: "/dashboard/admin/ideas/rejected", icon: XCircle },
            { title: "Reported Ideas", url: "/dashboard/admin/ideas/reported", icon: Flag },
        ],
    },
    {
        title: "User Management",
        items: [
            { title: "All Members", url: "/dashboard/admin/users", icon: Users },
            { title: "Active Members", url: "/dashboard/admin/users/active", icon: Users },
            { title: "Suspended Accounts", url: "/dashboard/admin/users/suspended", icon: Users },
        ],
    },
    {
        title: "Content Management",
        items: [
            { title: "Categories", url: "/dashboard/admin/categories", icon: Tag },
            { title: "Blog Posts", url: "/dashboard/admin/blog", icon: FileText },
            { title: "Newsletter", url: "/dashboard/admin/newsletter", icon: Mail },
        ],
    },
    {
        title: "Comment Moderation",
        items: [
            { title: "All Comments", url: "/dashboard/admin/comments", icon: MessageSquare },
            { title: "Reported Comments", url: "/dashboard/admin/comments/reported", icon: Flag },
        ],
    },
    {
        title: "System",
        items: [
            { title: "Activity Logs", url: "/dashboard/admin/logs", icon: Activity },
            { title: "Settings", url: "/dashboard/admin/settings", icon: Settings },
        ],
    },
];

export function AppSidebar({ user, ...props }: AppSidebarProps) {
    const pathname = usePathname();
    const profileRoute = getProfileRoute(user.role);

    // Select routes based on user role
    const routes = user.role === Roles.ADMIN ? adminRoutes : memberRoutes;

    const handleLogout = async () => {
        await authClient.signOut();
        window.location.href = "/";
    };

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const roleLabel = user.role === Roles.ADMIN ? "Admin" : "Member";

    return (
        <Sidebar
            collapsible="icon"
            className="border-r shrink-0 h-screen sticky top-0"
            {...props}
        >
            {/* Sidebar Header - Fixed */}
            <SidebarHeader className="border-b px-4 py-4 h-16 flex-shrink-0">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent whitespace-nowrap">
                        GreenSpark
                    </span>
                    <span className="text-xs text-muted-foreground hidden group-data-[collapsible=icon]:hidden">
                        {roleLabel}
                    </span>
                </Link>
            </SidebarHeader>

            {/* Sidebar Content - Scrollable */}
            <SidebarContent className="flex-1 overflow-y-auto">
                {routes.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider px-2">
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActiveRoute(pathname, item.url);

                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                                                <Link href={item.url} className="flex items-center gap-3">
                                                    {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
                                                    <span className="truncate">{item.title}</span>
                                                    {active && (
                                                        <ChevronRight className="h-3 w-3 ml-auto flex-shrink-0" />
                                                    )}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            {/* Sidebar Footer - Fixed */}
            <SidebarFooter className="border-t p-4 flex-shrink-0">
                <div className="flex items-center gap-3 mb-3 min-w-0">
                    <Avatar className="h-9 w-9 flex-shrink-0">
                        <AvatarImage src={user.image || undefined} alt={user.name} />
                        <AvatarFallback className="bg-green-100 text-green-700">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                        </p>
                        <p className="text-xs text-green-600 capitalize mt-0.5">
                            {user.role.toLowerCase()}
                        </p>
                    </div>
                </div>
                <div className="space-y-1">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground hover:text-foreground"
                        asChild
                    >
                        <Link href={profileRoute}>
                            <User className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="group-data-[collapsible=icon]:hidden truncate">Profile</span>
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden truncate">Logout</span>
                    </Button>
                </div>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}