import { cookies, headers } from "next/headers";

type ParsedCookie = {
    name: string;
    value: string;
    [key: string]: string | boolean;
};

export class ApiRequestServeur {
    static async getHeader(): Promise<Record<string, string>> {
        const headersReq: Record<string, string> = {};
        const cookieStore = await cookies();
        headersReq["content-type"] = "application/json";
        headersReq["Accept"] = "application/json";
        headersReq['Authorization'] = "Bearer " + cookieStore.get('login-token')?.value


        if (process.env.ENV_REFERER != undefined) {
            headersReq["referer"] = process.env.ENV_REFERER;
        }

        return headersReq
    }

    static async GET(url: string, params: any, header: any): Promise<Response> {
        let headers = await ApiRequestServeur.getHeader();
        return fetch(url, {
            method: "GET",
            credentials: "include",
            headers,
        })
    }

    static async POST(url: string, params: any, header: any): Promise<Response> {
        let headers = await ApiRequestServeur.getHeader();
        return fetch(url, {
            method: "POST",
            credentials: "include",
            headers,
            body: JSON.stringify(params),
        })
    }

    static async PUT(url: string, params: any, header: any): Promise<Response> {
        let headers = await ApiRequestServeur.getHeader();
        return fetch(url, {
            method: "PUT",
            credentials: "include",
            headers,
            body: JSON.stringify(params),
            redirect: "manual",
        })
    }

    static async DELETE(url: string, params: any, header: any): Promise<Response> {
        let headers = await ApiRequestServeur.getHeader();
        return fetch(url, {
            method: "DELETE",
            credentials: "include",
            headers,
            body: JSON.stringify(params),
            redirect: "manual",
        })
    }
}