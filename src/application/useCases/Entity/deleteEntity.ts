import { EntityRepository } from "../../repositories/EntityRepository";


export const deleteEntity = async (repo: EntityRepository, entityId: number) : Promise<void> => {
    await repo.delete(entityId);
}