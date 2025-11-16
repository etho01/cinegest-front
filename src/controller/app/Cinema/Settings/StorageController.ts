"use server";
import { addStorage } from "@/src/application/useCases/Cinema/Settings/Storage/addStorage";
import { deleteStorage } from "@/src/application/useCases/Cinema/Settings/Storage/deleteStorage";
import { updateStorage } from "@/src/application/useCases/Cinema/Settings/Storage/updateStorage";
import { StorageSchema } from "@/src/domain/Cinema/Settings/Storage";
import { StorageRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/StorageRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";

export const addOrUpdateStorageController = actionClient.schema(
    StorageSchema.extend({
        entityId: z.number(),
        cinemaId: z.number(),
    })
).action(async ({parsedInput: input}) => {
    if (input.id === 0) 
    {
        return await addStorage(StorageRepositoryImpl, input.entityId, input.cinemaId, input);
    }
    else 
    {
        return await updateStorage(StorageRepositoryImpl, input.entityId, input.cinemaId, input);
    }
});

export const deleteStorageController = actionClient.schema(
    z.object({
        entityId: z.number(),
        cinemaId: z.number(),
        storageId: z.number()
    })
).action(async ({parsedInput: { entityId, cinemaId, storageId }}) => {
    return await deleteStorage(StorageRepositoryImpl, entityId, cinemaId, storageId);
});