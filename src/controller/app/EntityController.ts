"use server"
import { addEntity } from "@/src/application/useCases/Entity/addEntity";
import { deleteEntity } from "@/src/application/useCases/Entity/deleteEntity";
import { updateEntity } from "@/src/application/useCases/Entity/updateEntity";
import { Entity, EntitySchema } from "@/src/domain/Entity";
import { EntityRepositoryImpl } from "@/src/infrastructure/repositories/EntityRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";

export const addOrUpdateEntityController = actionClient.schema(
    EntitySchema
).action(async ({parsedInput: entity}) => {
    let entitySaved : Entity;
    if (entity.id === 0) {
        entitySaved = await addEntity(EntityRepositoryImpl, entity);
    } else {
        entitySaved =  await updateEntity(EntityRepositoryImpl, entity);
    }
    return entitySaved;
});

export const addEntityController = actionClient.schema(
    EntitySchema
).action(async ({parsedInput: entity}) => {
    const entityCreated = await addEntity(EntityRepositoryImpl, entity);
    return entityCreated;
});
    
export const updateEntityController = actionClient.schema(
    EntitySchema
).action(async ({parsedInput: entity}) => {
    const entityUpdated = await updateEntity(EntityRepositoryImpl, entity);
    return entityUpdated;
});

export const deleteEntityController = actionClient.schema(
    z.object({
        id: z.number()
    })
).action(async ({parsedInput: entity}) => {
    await deleteEntity(EntityRepositoryImpl, entity.id);
});