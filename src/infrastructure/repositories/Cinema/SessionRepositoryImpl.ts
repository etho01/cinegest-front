import { SessionRepository } from "@/src/application/repositories/Cinema/SessionRepository";
import { AddSessionModalElement } from "@/src/application/useCases/Cinema/Sessions/addSessions";
import { PropsGetSessions } from "@/src/application/useCases/Cinema/Sessions/getSessions";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { buildApiUrl } from "@/src/lib/config/api";
import { throwErrorResponse } from "@/src/lib/request/Request";
import { Session } from "@/src/domain/Cinema/Session";


export const SessionRepositoryImpl : SessionRepository = {
    getSessions: async (entityId: number, cinemaId: number, props : PropsGetSessions) : Promise<Paginator<Session>> => {
        return ApiRequestServeur.getAndParse<Paginator<Session>>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/session`),
            props
        );
    },
    addSessions: async (entityId: number, cinemaId: number, sessions : AddSessionModalElement) : Promise<void> => {
        const resp = await ApiRequestServeur.POST(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/session/addSessions`),
            sessions,
            {}
        );
        await throwErrorResponse(resp);
    },
    deleteSession: async (entityId: number, cinemaId: number, sessionId: number): Promise<void> => {
        return ApiRequestServeur.deleteRequest(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/session/${sessionId}`)
        );
    }
};