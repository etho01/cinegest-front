

export interface ApiRequestInterface {
    GET : (url : string, params : any, header : any) => Promise<Response>
    POST : (url : string, params : any, header : any) => Promise<Response>
    PUT : (url : string, params : any, header : any) => Promise<Response>
    DELETE : (url : string, params : any, header : any) => Promise<Response>
}
