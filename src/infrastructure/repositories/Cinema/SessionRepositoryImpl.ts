import { SessionRepository } from "@/src/application/repositories/Cinema/SessionRepository";
import { AddSessionModalElement } from "@/src/application/useCases/Cinema/Sessions/addSessions";
import { PropsGetSessions } from "@/src/application/useCases/Cinema/Sessions/getSessions";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";
import { Session } from "inspector/promises";


export const SessionRepositoryImpl : SessionRepository = {
    getSessions: async (entityId: number, cinemaId: number, props : PropsGetSessions) : Promise<Paginator<Session>> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/session`, props, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Paginator<Session>;
    },
    addSessions: async (entityId: number, cinemaId: number, sessions : AddSessionModalElement) : Promise<void> => {
        const resp =  await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/session/addSessions`, sessions, {});
        await throwErrorResponse(resp);
    },
    deleteSession: async (entityId: number, cinemaId: number, sessionId: number): Promise<void> => {
        const resp = await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/session/${sessionId}`, {}, {});
        await throwErrorResponse(resp);
    }
};