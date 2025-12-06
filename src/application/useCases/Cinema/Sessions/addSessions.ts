import { SessionRepository } from "@/src/application/repositories/Cinema/SessionRepository";


export interface AddSessionModalElement {
    sessions : {
        movieVersionId : number | null;
        roomId : number;
        startAt : Date | null;
    }[];
}

export const addSessions = async (repo : SessionRepository, entityId: number, cinemaId: number, sessions : AddSessionModalElement) : Promise<void> => {
    await repo.addSessions(entityId, cinemaId, sessions);
}