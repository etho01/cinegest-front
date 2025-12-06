import { SessionRepository } from "@/src/application/repositories/Cinema/SessionRepository";

export interface PropsGetSessions {
    page : number;
    rooms? : number[];
    movies? : number[];

    status? : string[];
};

export const getSessions = async (repo : SessionRepository, entityId: number, cinemaId: number, props: PropsGetSessions) : Promise<any> => {
    return await repo.getSessions(entityId, cinemaId, props);
}