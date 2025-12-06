import { SessionRepository } from "@/src/application/repositories/Cinema/SessionRepository";


export const deleteSession = async (repo: SessionRepository, entityId: number, cinemaId: number, sessionId: number): Promise<void> => {
    await repo.deleteSession(entityId, cinemaId, sessionId);
}