"use server";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";


export const addStorageItemsController = actionClient.schema(
    z.object({
        entityId: z.number(),
        cinemaId: z.number(),
    })
).action(async ({parsedInput: storageItem}) => {
    await addStorageItem(StorageItemRepositoryImpl, storageItem.entityId, storageItem.cinemaId, storageItem);
});