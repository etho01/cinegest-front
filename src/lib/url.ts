// lib/url.ts
export function withSearchParams(base: string, params: Record<string, unknown>) 
{
    const u = new URL(
        base,
        typeof window !== "undefined" ? window.location.origin : "http://local"
    );
    // On nettoie d'abord
    u.search = "";
    const sp = u.searchParams;

    Object.entries(params).forEach(([k, v]) => {
        if (v === undefined || v === null || v === "") return;

        if (Array.isArray(v)) 
        {
            if (v.length === 0) return;
            // key[]=v1&key[]=v2
            v.forEach((item) => {
                if (item === undefined || item === null || item === "") return;
                sp.append(`${k}[]`, String(item));
            });
        } 
        else if (typeof v === "boolean") 
        {
            sp.set(k, v ? "1" : "0");
        } 
        else 
        {
            sp.set(k, String(v));
        }
    });

    return u.toString();
}

// Helpers lecture arrays depuis l'URL (key[]=…)
export function readArrayFromURL(sp: URLSearchParams, key: string) {
    return sp.getAll(`${key}[]`);
}

export function readNumber(sp: URLSearchParams, key: string, fallback: number) {
    const n = Number(sp.get(key));
    return Number.isFinite(n) ? n : fallback;
}

export function getObjectFromSearchParams(sp: Record<string, string | string[] | undefined>, type : string, initialValue?: Array<string>): Array<string>
{
    const items: Array<string> = [];
    const values = sp[`${type}[]`];
    if (values !== undefined) {
        if (Array.isArray(values)) {
            values.forEach((value) => {
                items.push(String(value));
            });
        }
        else 
        {
            items.push(String(values));
        }
    }

    if (initialValue !== undefined) {
        return initialValue;
    }

    return items;
}