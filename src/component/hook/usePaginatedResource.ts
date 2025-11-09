// hooks/usePaginatedResource.ts
"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { Paginator } from "../ui/pagination/PaginationType";
import { withSearchParams } from "@/src/lib/url";
import { Unauthorized } from "@/src/domain/User";

type Fetcher<T> = (url: string, init?: RequestInit) => Promise<Paginator<T>>;

export function defaultFetcher<T>(url: string, init?: RequestInit) {
    return fetch(url, init).then(async (r) => {
        if (r.status === 403) throw new Unauthorized();
        if (!r.ok) throw new Error(`Erreur API (${r.status})`);
        return (await r.json()) as Paginator<T>;
    });
}

export type PaginatedOptions<T> = {
    endpoint: string;                       // ex: `${API_BASE}/users`
    fetcher?: Fetcher<T>;                   // par défaut: fetch JSON Laravel
    initialParams?: Record<string, unknown>;
    initialPage?: number;
    initialData?: Paginator<T>;      // SSR
    syncUrl?: boolean;                      // met à jour l’URL
    usePushState?: boolean;                 // sinon replaceState
};

export function usePaginatedResource<T>({
    endpoint,
    fetcher = defaultFetcher<T>,
    initialParams = {},
    initialPage = 1,
    initialData,
    syncUrl = true,
    usePushState = false,
}: PaginatedOptions<T>) {

    const [data, setData] = useState<Paginator<T> | null>(initialData ?? null);
    const [isInit, setIsInit] = useState(false);
    const [page, setPage] = useState(initialData?.current_page ?? initialPage);
    const [params, setParamsState] = useState<Record<string, unknown>>(initialParams);
    const [error, setError] = useState<Error | null>(null);
    const [isPending, setIsPending] = useState(false);
    const abortRef = useRef<AbortController | null>(null);

    const url = useMemo(() => {
        return withSearchParams(endpoint, { page, ...params });
    }, [endpoint, page, params]);

    const runFetch = useCallback(
        async (u: string) => {
            setIsPending(true);
            if (abortRef.current) abortRef.current.abort();
            const ctrl = new AbortController();
            abortRef.current = ctrl;
            setError(null);
            try {
                const res = await fetcher(u, { signal: ctrl.signal });
                setData(res);
            } 
            catch (error) 
            {
                setError(error as Error);
            }
            setIsPending(false);
        },
        [fetcher]
    );

    // refetch à chaque changement de url (interactions)
    useEffect(() => {
        if (initialData && !isInit) 
        {
            setIsInit(true);
            return
        }

        setIsInit(true);
        //if (!data) return; // si déjà SSR, on attend une interaction
            runFetch(url).catch((e) => setError(e as Error));
    }, [url]); // eslint-disable-line react-hooks/exhaustive-deps

    // Sync URL (page/per_page/params)
    useEffect(() => {
        if (!syncUrl || typeof window === "undefined") return;
        const next = withSearchParams(window.location.pathname, { page, ...params });
        if (usePushState) window.history.pushState(null, "", next);
        else window.history.replaceState(null, "", next);
    }, [page, params, syncUrl, usePushState]);

    // Back/forward : recharger selon l’URL
    useEffect(() => {
        if (!syncUrl || typeof window === "undefined") return;
        const onPop = () => {
            const sp = new URLSearchParams(window.location.search);
            const p = Number(sp.get("page") ?? 1) || 1;
            const rest: Record<string, unknown> = {};
            sp.forEach((v, k) => {
                if (k !== "page" && k !== "per_page") rest[k] = v;
            });
            setPage(p);
            setParamsState(rest);
            runFetch(withSearchParams(endpoint, { page: p, ...rest })).catch((e) =>
                setError(e as Error)
            );
        };
        window.addEventListener("popstate", onPop);
        return () => window.removeEventListener("popstate", onPop);
    }, [endpoint, runFetch, syncUrl]);

    const setParams = (updater: (prev: Record<string, unknown>) => Record<string, unknown>) => {
        setPage(1);
        setParamsState((prev) => updater(prev));
    };

    const updateParam = (key: string, value: unknown) => {
        setPage(1);
        setParamsState((prev) => ({ ...prev, [key]: value }));
    }

    return {
        data,
        isPending,
        error,
        page,
        params,
        setPage,
        setParams,   // 👈 exposé
        updateParam, // 👈 exposé
        refresh: () => runFetch(url).catch((e) => setError(e as Error)),
    };
}
