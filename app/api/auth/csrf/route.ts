import { NextRequest } from "next/server";
// to set up laravel cookie

export async function relayResponse(laravelRes: Response) {
    const status = laravelRes.status;

    const headers = new Headers();

    const setCookies: string[] = (laravelRes.headers as any).getSetCookie?.() || [];
    if (setCookies.length) {
        for (const c of setCookies) headers.append("set-cookie", c);
    } else {
        const merged = laravelRes.headers.get("set-cookie");
        if (merged) headers.append("set-cookie", merged);
    }

    const hasBody = !(status === 204 || status === 304);

    if (hasBody) {
        const ct = laravelRes.headers.get("content-type");
        if (ct) headers.set("content-type", ct);
        const bodyText = await laravelRes.text();
        return new Response(bodyText, { status, headers });
    }

    return new Response(null, { status, headers });
}

export async function GET(req: NextRequest) {
    const res = await fetch(`${process.env.API_URL}api/csrf-cookie`, {
        method: "GET",
        // important pour que Laravel pose les cookies
        credentials: "include",
        headers: {
            // Propage aussi les cookies entrants (si présents)
            cookie: req.headers.get("cookie") || "",
        },
    });

    return relayResponse(res);
}