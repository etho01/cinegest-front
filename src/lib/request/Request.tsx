import { ObjectNotFound } from "@/src/domain/global"
import { Unauthenticated, Unauthorized } from "@/src/domain/User"


export interface ApiRequestInterface {
    GET : (url : string, params : any, header : any) => Promise<Response>
    POST : (url : string, params : any, header : any) => Promise<Response>
    PUT : (url : string, params : any, header : any) => Promise<Response>
    DELETE : (url : string, params : any, header : any) => Promise<Response>
}

export const throwErrorResponse = async (resp: Response) => {
    if (resp.status == 403)
    {
        throw new Unauthorized();
    }
    else if (resp.status == 401) 
    {
        throw new Unauthenticated();
    }
    else if (resp.status == 404) 
    {
        const errorData = await resp.json();
        console.error(`API Error: ${resp.status} - ${errorData.message || resp.statusText}`);
        throw new ObjectNotFound();
    }
    else if (!resp.ok)
    {

        const errorData = await resp.json();
        console.error(`API Error: ${resp.status} - ${errorData.message || resp.statusText}`);
        throw new Error(`API Error: ${resp.status} - ${errorData.message || resp.statusText}`);
    }
}