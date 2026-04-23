
export const Roles = {
    MEMBER: "MEMBER",
    ADMIN: "ADMIN"
} as const;

export type Role = typeof Roles[keyof typeof Roles];