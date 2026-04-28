import Link from "next/link";
import { PlusCircle, Mail, Download, Trash2, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const actions = [
    { title: "Create Category", href: "/dashboard/admin/categories/create", icon: PlusCircle, color: "bg-green-100 text-green-700" },
    { title: "Send Newsletter", href: "/dashboard/admin/newsletter", icon: Mail, color: "bg-blue-100 text-blue-700" },
    { title: "Export Data", href: "/api/admin/export", icon: Download, color: "bg-purple-100 text-purple-700", external: true },
    { title: "Clear Cache", href: "#", icon: Trash2, color: "bg-orange-100 text-orange-700" },
    { title: "System Settings", href: "/dashboard/admin/settings", icon: Settings, color: "bg-gray-100 text-gray-700" },
];

export function QuickActions() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-3">
                    {actions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <Button
                                key={action.title}
                                variant="outline"
                                className="justify-start gap-2"
                                asChild
                            >
                                {action.external ? (
                                    <a href={action.href} target="_blank" rel="noopener noreferrer">
                                        <Icon className="h-4 w-4" />
                                        {action.title}
                                    </a>
                                ) : (
                                    <Link href={action.href}>
                                        <Icon className="h-4 w-4" />
                                        {action.title}
                                    </Link>
                                )}
                            </Button>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}