import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"


export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isLog = req.cookies.has('login-token');

    // Pages publiques (pas besoin d'être connecté)
    const publicPaths = ['/login', '/forgot-password', '/reset-password'];
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
    console.log(`Middleware - Path: ${pathname}, isLog: ${isLog}, isPublicPath: ${isPublicPath}`, req.cookies.get('login-token')?.value);

    if (isPublicPath && isLog)
    {
        const url = req.nextUrl.clone();
        url.pathname = "/app";
        return NextResponse.redirect(url);
    }
    else if (!isLog && !isPublicPath && (pathname == '' || pathname.startsWith('/app')))
    {
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}


export const config = {
    matcher: ["/:path*"],
};