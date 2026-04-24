import { getSession } from "@/actions/auth.action";
import { redirect } from "next/navigation";
import { Roles } from "@/constants/roles";

export default async function MemberLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const { data: session } = await getSession();

    if (!session?.user || session.user.role !== Roles.MEMBER) {
        redirect("/dashboard");
    }

    return <>{children}</>;
}