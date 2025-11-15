"use server";

import { addOptionType } from "@/src/application/useCases/Cinema/Settings/OptionTypes/addOptionType";
import { deleteOptionsType } from "@/src/application/useCases/Cinema/Settings/OptionTypes/deleteOptionType";
import { updateOptionType } from "@/src/application/useCases/Cinema/Settings/OptionTypes/updateOptionType";
import { OptionTypeSchema } from "@/src/domain/Cinema/Settings/OptionTypes";
import { OptionTypesRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/OptionTypesControllerImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";

export const addOrUpdateOptionTypeController = actionClient.schema(
    OptionTypeSchema.extend({
        entityId: z.number(),
        cinemaId: z.number(),
    })
).action(async ({parsedInput: input}) => {
    if (input.id === 0) {
        // Create new
        return await addOptionType(OptionTypesRepositoryImpl, input.entityId, input.cinemaId, input);
    } else {
        // Update existing
        return await updateOptionType(OptionTypesRepositoryImpl, input.entityId, input.cinemaId, input);
    }
});

export const deleteOptionTypeController = actionClient.schema(
    z.object({
        entityId: z.number(),
        cinemaId: z.number(),
        optionTypeId: z.number()
    })
).action(async ({parsedInput: { entityId, cinemaId, optionTypeId }}) => {
    return await deleteOptionsType(OptionTypesRepositoryImpl, entityId, cinemaId, optionTypeId);
});