import { Entity } from "@/src/domain/Entity";
import { EntityRepository } from "../../repositories/EntityRepository";

export const updateEntity = async (repo: EntityRepository, entity: Entity) : Promise<Entity> => {
    return await repo.updateEntity(entity);
}