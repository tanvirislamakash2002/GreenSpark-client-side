export interface User {
    id: string;
    name: string;
    email: string;
    role: "MEMBER" | "ADMIN";
    image?: string | null;
    isActive?: boolean;
}