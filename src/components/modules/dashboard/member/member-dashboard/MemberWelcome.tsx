import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MemberWelcomeProps {
    name: string;
    email: string;
    image?: string | null;
    memberSince: string;
}

export function MemberWelcome({ name, email, image, memberSince }: MemberWelcomeProps) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const formattedDate = new Date(memberSince).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-green-200">
                    <AvatarImage src={image || undefined} />
                    <AvatarFallback className="bg-green-100 text-green-700 text-xl">
                        {initials}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Welcome back, {name.split(" ")[0]}!
                    </h1>
                    <p className="text-muted-foreground">
                        Member since {formattedDate}
                    </p>
                    <p className="text-sm text-muted-foreground">{email}</p>
                </div>
            </div>
        </div>
    );
}