import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"


export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isLog = req.cookies.has('login-token');

    // Redirige les utilisateurs connectés hors des pages publiques
    const publicPaths = ['/login', '/forgot-password', '/reset-password'];
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

    if (isPublicPath && isLog) {
        const url = req.nextUrl.clone();
        url.pathname = "/app";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}


export const config = {
    matcher: ["/(login|forgot-password|reset-password)(.*)"],
};