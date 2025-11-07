"use server";

import { addCinema } from "@/src/application/useCases/Cinema/addCinema";
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