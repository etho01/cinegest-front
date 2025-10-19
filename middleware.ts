import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"
import { cookies } from "next/headers";


export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const cookieStore = await cookies();
    let isLog = cookieStore.has('login-token');

    if (pathname.startsWith('/login') && isLog)
    {
        const url = req.nextUrl.clone();
        url.pathname = "/app";
        return NextResponse.redirect(url);
    }
    else if (!isLog && (pathname == '' || pathname.startsWith('/app')))
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