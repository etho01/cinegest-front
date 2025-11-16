"use server";
import { addStorageType } from "@/src/application/useCases/Cinema/Settings/StorageType/addStorageType";
import { deleteStorageType } from "@/src/application/useCases/Cinema/Settings/StorageType/deleteStorageType";
import { updateStorageType } from "@/src/application/useCases/Cinema/Settings/StorageType/updateStorageType";
import { StorageTypeSchema } from "@/src/domain/Cinema/Settings/StorageType";
import { StorageTypeRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/StorageTypeRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";

export const addOrUpdateStorageTypeController = actionClient.schema(
    StorageTypeSchema.extend({
        entityId: z.number(),
        cinemaId: z.number()
    })
).action(async ({parsedInput: input}) => {
    if (input.id === 0) 
    {
        return await addStorageType(StorageTypeRepositoryImpl, input.entityId, input.cinemaId, input);
    } else
    {
        return await updateStorageType(StorageTypeRepositoryImpl, input.entityId, input.cinemaId, input);
    }
});

export const deleteStorageTypeController = actionClient.schema(
    z.object({
        entityId: z.number(),
        cinemaId: z.number(),
        storageTypeId: z.number()
    })
).action(async ({parsedInput: { entityId, cinemaId, storageTypeId }}) => {
    return await deleteStorageType(StorageTypeRepositoryImpl, entityId, cinemaId, storageTypeId);
});