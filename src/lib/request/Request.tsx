import { Unauthenticated, Unauthorized } from "@/src/domain/User"


export interface ApiRequestInterface {
    GET : (url : string, params : any, header : any) => Promise<Response>
    POST : (url : string, params : any, header : any) => Promise<Response>
    PUT : (url : string, params : any, header : any) => Promise<Response>
    DELETE : (url : string, params : any, header : any) => Promise<Response>
}

export const throwErrorResponse = async (resp: Response) => {
    if (resp.status == 403) {
        throw new Unauthorized();
    }
    if (resp.status == 401) {
        throw new Unauthenticated();
    }
}