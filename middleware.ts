import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"
import { cookies } from "next/headers";


export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const cookieStore = await cookies();
    const isLog = cookieStore.has('login-token');

    // Pages publiques (pas besoin d'être connecté)
    const publicPaths = ['/login', '/forgot-password', '/reset-password'];
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
    console.log(`Middleware - Path: ${pathname}, isLog: ${isLog}, isPublicPath: ${isPublicPath}`, cookieStore.get('login-token')?.value, cookieStore.has('login-token'));

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