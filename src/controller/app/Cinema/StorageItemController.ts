"use server";
import { addStorageItems } from "@/src/application/useCases/Cinema/StorageItem/addStorageItems";
import { StorageItemRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/StorageItemRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";


export const addStorageItemsController = actionClient.schema(
    z.object({
        entityId: z.number(),
        cinemaId: z.number(),
        roomId: z.number().optional(),
        storageId: z.number().optional(),
        originId: z.number().optional(),
        movieVersions: z.array(z.number({message: "Veuillez sélectionner une version de film."})),
    })
).action(async ({parsedInput: storageItem}) => {
    await addStorageItems(StorageItemRepositoryImpl, storageItem.entityId, storageItem.cinemaId, storageItem);
});