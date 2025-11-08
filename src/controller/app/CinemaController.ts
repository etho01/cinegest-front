"use server";

import { addCinema } from "@/src/application/useCases/Cinema/addCinema";
import { deleteCinema } from "@/src/application/useCases/Cinema/deleteCinema";
import { updateCinema } from "@/src/application/useCases/Cinema/updateCinema";
import { Cinema, CinemaSchema } from "@/src/domain/Cinema";
import { CinemaRepositoryImpl } from "@/src/infrastructure/repositories/CinemaRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";


export const addOrUpdateCinemaController = actionClient.schema(
    CinemaSchema.extend({ entityId: z.number() })
).action(async ({parsedInput: cinema}) => {
    let cinemaSaved : Cinema;
    if (cinema.id === 0) {
        cinemaSaved = await addCinema(CinemaRepositoryImpl, cinema.entityId, cinema);
    } else {
        cinemaSaved =  await updateCinema(CinemaRepositoryImpl, cinema.entityId, cinema);
    }
    return cinemaSaved;
});

export const deleteCinemaController = actionClient.schema(
    z.object({
        entityId: z.number(),
        cinemaId: z.number()
    })
).action(async ({parsedInput: { entityId, cinemaId }}) => {
    await deleteCinema(CinemaRepositoryImpl, entityId, cinemaId);
    return true;
});