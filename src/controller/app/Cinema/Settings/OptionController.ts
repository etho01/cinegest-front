"use server";
import { addOption } from "@/src/application/useCases/Cinema/Settings/Option/addOption";
import { deleteOption } from "@/src/application/useCases/Cinema/Settings/Option/deleteOption";
import { updateOption } from "@/src/application/useCases/Cinema/Settings/Option/updateOption";
import { OptionSchema } from "@/src/domain/Cinema/Settings/Option";
import { OptionsRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/OptionsRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";

export const addOrUpdateOptionController = actionClient.schema(
    OptionSchema.extend({
        entityId: z.number(),
        cinemaId: z.number(),
    })
).action(async ({ parsedInput : input }) => {
    if (input.id === 0)
    {
        return await addOption(OptionsRepositoryImpl, input.entityId, input.cinemaId, input);
    }
    else
    {
        return await updateOption(OptionsRepositoryImpl, input.entityId, input.cinemaId, input);
    }
})

export const deleteOptionController = actionClient.schema(
    z.object({
        entityId: z.number(),
        cinemaId: z.number(),
        optionId: z.number()
    })
).action(async ({parsedInput: { entityId, cinemaId, optionId }}) => {
    return await deleteOption(OptionsRepositoryImpl, entityId, cinemaId, optionId);
});