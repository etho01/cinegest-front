import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { PropsGetSessions } from "../../useCases/Cinema/Sessions/getSessions";
import { AddSessionModalElement } from "../../useCases/Cinema/Sessions/addSessions";
import { Session } from "@/src/domain/Cinema/Session";


export interface SessionRepository {
    getSessions(entityId: number, cinemaId: number, props: PropsGetSessions): Promise<Paginator<Session>>;
    addSessions(entityId: number, cinemaId: number, sessions : AddSessionModalElement) : Promise<void>;
    deleteSession(entityId: number, cinemaId: number, sessionId: number): Promise<void>;
}