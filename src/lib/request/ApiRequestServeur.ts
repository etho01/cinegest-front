import { cookies } from "next/headers";
import { withSearchParams } from "../url";
import { RequestParams, RequestHeaders } from "./types";
import { throwErrorResponse } from "./Request";

export class ApiRequestServeur {
    static async getHeader(header: RequestHeaders = {}): Promise<RequestHeaders> {
        const headersReq: RequestHeaders = { ...header };
        const cookieStore = await cookies();
        headersReq["content-type"] = "application/json";
        headersReq["Accept"] = "application/json";
        headersReq['Authorization'] = "Bearer " + cookieStore.get('login-token')?.value


        if (process.env.ENV_REFERER != undefined) {
            headersReq["referer"] = process.env.ENV_REFERER;
        }

        return headersReq
    }

    static async GET(url: string, params: RequestParams = {}, header: RequestHeaders = {}): Promise<Response> {
        url = withSearchParams(url, params);
        const headers = await ApiRequestServeur.getHeader(header);
        return fetch(url, {
            method: "GET",
            credentials: "include",
            headers,
        })
    }

    static async POST(url: string, params: RequestParams = {}, header: RequestHeaders = {}): Promise<Response> {
        const headers = await ApiRequestServeur.getHeader(header);
        return fetch(url, {
            method: "POST",
            credentials: "include",
            headers,
            body: JSON.stringify(params),
        })
    }

    static async PUT(url: string, params: RequestParams = {}, header: RequestHeaders = {}): Promise<Response> {
        const headers = await ApiRequestServeur.getHeader(header);
        return fetch(url, {
            method: "PUT",
            credentials: "include",
            headers,
            body: JSON.stringify(params),
            redirect: "manual",
        })
    }

    static async DELETE(url: string, params: RequestParams = {}, header: RequestHeaders = {}): Promise<Response> {
        const headers = await ApiRequestServeur.getHeader(header);
        return fetch(url, {
            method: "DELETE",
            credentials: "include",
            headers,
            body: JSON.stringify(params),
            redirect: "manual",
        })
    }

    /**
     * Helper générique pour effectuer une requête et parser la réponse JSON
     * Gère automatiquement les erreurs et le parsing
     */
    static async fetchAndParse<T>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        params?: RequestParams,
        header?: RequestHeaders
    ): Promise<T> {
        const resp = await this[method](url, params, header);
        await throwErrorResponse(resp);
        return await resp.json() as T;
    }

    /**
     * Helper pour les requêtes GET avec parsing automatique
     */
    static async getAndParse<T>(url: string, params?: RequestParams, header?: RequestHeaders): Promise<T> {
        return this.fetchAndParse<T>('GET', url, params, header);
    }

    /**
     * Helper pour les requêtes POST avec parsing automatique
     */
    static async postAndParse<T>(url: string, params?: RequestParams, header?: RequestHeaders): Promise<T> {
        return this.fetchAndParse<T>('POST', url, params, header);
    }

    /**
     * Helper pour les requêtes PUT avec parsing automatique
     */
    static async putAndParse<T>(url: string, params?: RequestParams, header?: RequestHeaders): Promise<T> {
        return this.fetchAndParse<T>('PUT', url, params, header);
    }

    /**
     * Helper pour les requêtes DELETE (sans parsing de réponse)
     */
    static async deleteRequest(url: string, params?: RequestParams, header?: RequestHeaders): Promise<void> {
        const resp = await this.DELETE(url, params, header);
        await throwErrorResponse(resp);
    }
}