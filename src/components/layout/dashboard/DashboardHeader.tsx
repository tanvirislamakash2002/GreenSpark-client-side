"use client";

import { Bell, Search, Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserType } from "@/types";

interface DashboardHeaderProps {
    user: UserType;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
    const { toggleSidebar } = useSidebar();

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={toggleSidebar}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    
                    {/* Search - Desktop */}
                    <div className="hidden md:flex relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search ideas..."
                            className="pl-9"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search - Mobile */}
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Search className="h-5 w-5" />
                    </Button>

                    <ThemeToggle />
                    
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                    </Button>
                    
                    <div className="flex items-center gap-3 pl-3 border-l">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.image || undefined} />
                            <AvatarFallback className="bg-green-100 text-green-700">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="hidden lg:block">
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">
                                {user.role.toLowerCase()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}