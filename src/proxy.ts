import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./actions/auth.action";
import { Roles } from "./constants/roles";

export const proxy = async (request: NextRequest) => {
    const pathName = request.nextUrl.pathname;
    let isAuthenticated = false;
    let userRole = '';

    const { data } = await getSession();
    if (data?.user) {
        isAuthenticated = true;
        userRole = data.user.role;
    }

    // Auth required for these routes
    if (
        pathName.startsWith('/dashboard') ||
        pathName.startsWith('/member') ||
        pathName.startsWith('/admin') ||
        pathName === '/profile'
    ) {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // Admin only routes
    if (pathName.startsWith('/admin') && userRole !== Roles.ADMIN) {
        return NextResponse.redirect(new URL("/member", request.url));
    }

    // Member only routes (admin can't access)
    if (pathName.startsWith('/member') && userRole !== Roles.MEMBER) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    // Redirect /dashboard based on role
    if (pathName === '/dashboard') {
        if (userRole === Roles.ADMIN) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
        if (userRole === Roles.MEMBER) {
            return NextResponse.redirect(new URL("/member", request.url));
        }
    }

    // Redirect to dashboard if already logged in and trying to access auth pages
    if ((pathName === '/login' || pathName === '/register') && isAuthenticated) {
        if (userRole === Roles.ADMIN) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
        return NextResponse.redirect(new URL("/member", request.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        '/dashboard',
        '/dashboard/:path*',
        '/member/:path*',
        '/admin/:path*',
        '/profile',
        '/login',
        '/register',
    ],
};