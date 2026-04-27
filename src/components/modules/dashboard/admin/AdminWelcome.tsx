import { Shield, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AdminWelcomeProps {
    name: string;
    email: string;
    lastLogin?: string;
}

export function AdminWelcome({ name, email, lastLogin }: AdminWelcomeProps) {
    const firstName = name.split(" ")[0];

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Welcome back, {firstName}!
                    </h1>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <Shield className="h-3 w-3 mr-1" />
                        Administrator
                    </Badge>
                </div>
                <p className="text-muted-foreground">{email}</p>
                {lastLogin && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Last login: {new Date(lastLogin).toLocaleString()}</span>
                    </div>
                )}
            </div>
        </div>
    );
}