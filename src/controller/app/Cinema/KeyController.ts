"use server";
import { addKeys } from "@/src/application/useCases/Cinema/Key/addKeys";
import { deleteKey } from "@/src/application/useCases/Cinema/Key/deleteKey";
import { KeyRepositoryImpl } from "@/src/infrastructure/repositories/KeyRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";


export const addKeysController = actionClient.schema(
    z.object({
        entityId: z.number(),
        cinemaId: z.number(),
        dateStart: z.date({message: "Vous devez renseigner la période de validité"}),
        dateEnd: z.date({message: "Vous devez renseigner la période de validité"}),
        versions: z.array(z.object({
            movieVersionId: z.number({ message: "Vous devez sélectionner une version" }).min(1, { message: "Vous devez sélectionner une version" }).nullable(),
            rooms: z.array(z.string()).nonempty({ message: "Au moins une salle doit être sélectionnée" }),
        })),
    })
).action(async ({parsedInput}) => {
    await addKeys(KeyRepositoryImpl, parsedInput.entityId, parsedInput.cinemaId, parsedInput)
})

export const deleteKeyController = actionClient.schema(
    z.object({
        entityId: z.number(),
        cinemaId: z.number(),
        keyId: z.number(),
    })
).action(async ({parsedInput}) => {
    await deleteKey(KeyRepositoryImpl, parsedInput.entityId, parsedInput.cinemaId, parsedInput.keyId);
})