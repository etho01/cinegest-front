import { ErrorApi, ObjectNotFound, ValidationError } from "@/src/domain/global"
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
        console.error(errorData);
        console.error(`API Error: ${resp.status} - ${errorData.message || resp.statusText}`);
        throw new ObjectNotFound();
    }
    else if (resp.status == 400)
    {
        const errorData = await resp.json();
        console.error(errorData);
        throw new ErrorApi(
            errorData.message || "Une erreur est survenue lors de la requête.",
            errorData.type || "API_ERROR"
        );
    }
    else if (resp.status == 422)
    {
        const errorData = await resp.json();
        console.error(errorData);
        console.error(`Validation Error: ${resp.status} - ${errorData.message || resp.statusText}`);
        throw new ValidationError(errorData.message || "Une erreur de validation est survenue.");
    }
    else if (!resp.ok)
    {

        const errorData = await resp.json();
        console.error(`API Error: ${resp.status} - ${errorData.message || resp.statusText}`);
        console.error(errorData);
        throw new Error(`API Error: ${resp.status} - ${errorData.message || resp.statusText}`);
    }
}