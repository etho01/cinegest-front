"use server";
import { addCinemaApi } from "@/src/application/useCases/cinemaApi/addCinemaApi";
import { deleteCinemaApi } from "@/src/application/useCases/cinemaApi/deleteCinemaApi";
import { updateCinemaApi } from "@/src/application/useCases/cinemaApi/updateCinemaApi";
import { CinemaApiSchema } from "@/src/domain/CinemaApi";
import { CinemaApiRepositoryImpl } from "@/src/infrastructure/repositories/CinemaApiRepositoryImpt";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";

export const addOrUpdateCinemaApiController = actionClient.schema(
    CinemaApiSchema.extend({
        entityId: z.number(),
        cinemaIds: z.array(z.number())
    })
).action(async ({parsedInput: input}) => {
    if (input.id == 0) 
    {
        await addCinemaApi(CinemaApiRepositoryImpl, input.entityId, { ...input, apiKey: '' });
    } 
    else
    {
        await updateCinemaApi(CinemaApiRepositoryImpl, input.entityId, { ...input, apiKey: '' });
    }
});

export const deleteCinemaApiController = actionClient.schema(
    z.object({
        entityId: z.number(),
        cinemaApiId: z.number()
    })
).action(async ({parsedInput: { entityId, cinemaApiId }}) => {
    await deleteCinemaApi(CinemaApiRepositoryImpl, entityId, cinemaApiId);
    return true;
});