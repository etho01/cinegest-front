import { cookies } from "next/headers";
import { withSearchParams } from "../url";

export class ApiRequestServeur {
    static async getHeader(header: Record<string, string>): Promise<Record<string, string>> {
        const headersReq: Record<string, string> = header || {};
        const cookieStore = await cookies();
        headersReq["content-type"] = "application/json";
        headersReq["Accept"] = "application/json";
        headersReq['Authorization'] = "Bearer " + cookieStore.get('login-token')?.value


        if (process.env.ENV_REFERER != undefined) {
            headersReq["referer"] = process.env.ENV_REFERER;
        }

        return headersReq
    }

    static async GET(url: string, params: any, header: Record<string, string> = {}): Promise<Response> {
        url = withSearchParams(url, params);
        const headers = await ApiRequestServeur.getHeader(header);
        return fetch(url, {
            method: "GET",
            credentials: "include",
            headers,
        })
    }

    static async POST(url: string, params: any, header: Record<string, string> = {}): Promise<Response> {
        const headers = await ApiRequestServeur.getHeader(header);
        return fetch(url, {
            method: "POST",
            credentials: "include",
            headers,
            body: JSON.stringify(params),
        })
    }

    static async PUT(url: string, params: any, header: Record<string, string> = {}): Promise<Response> {
        const headers = await ApiRequestServeur.getHeader(header);
        return fetch(url, {
            method: "PUT",
            credentials: "include",
            headers,
            body: JSON.stringify(params),
            redirect: "manual",
        })
    }

    static async DELETE(url: string, params: any, header: Record<string, string> = {}): Promise<Response> {
        const headers = await ApiRequestServeur.getHeader(header);
        return fetch(url, {
            method: "DELETE",
            credentials: "include",
            headers,
            body: JSON.stringify(params),
            redirect: "manual",
        })
    }
}