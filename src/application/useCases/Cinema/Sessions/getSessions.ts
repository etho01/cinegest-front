import { SessionRepository } from "@/src/application/repositories/Cinema/SessionRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Session } from "@/src/domain/Cinema/Session";

export interface PropsGetSessions {
    page : number;
    rooms? : number[];
    movies? : number[];

    status? : string[];
};

export const getSessions = async (repo : SessionRepository, entityId: number, cinemaId: number, props: PropsGetSessions) : Promise<Paginator<Session>> => {
    return repo.getSessions(entityId, cinemaId, props);
}