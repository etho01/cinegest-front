"use server";
import { addMovie } from "@/src/application/useCases/Cinema/Movie/addMovie";
import { deleteMovie } from "@/src/application/useCases/Cinema/Movie/deleteMovie";
import { MovieSchema, MovieVersionSchema } from "@/src/domain/Cinema/Movie";
import { MovieRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/MovieRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";

export const deleteMovieController = actionClient.schema(
    z.object({
        entityId: z.number(),
        cinemaId: z.number(),
        movieId: z.number(),
    })
).action(async ({parsedInput}) => {
    await deleteMovie(MovieRepositoryImpl, parsedInput.entityId, parsedInput.cinemaId, parsedInput.movieId);
});

export const addMovieController = actionClient.schema(
    MovieSchema.extend({ entityId: z.number(), cinemaId: z.number() })
).action(async ({parsedInput: movie}) => {
    addMovie(MovieRepositoryImpl, movie.entityId, movie.cinemaId, movie);
})

export const addMovieVersionController = actionClient.schema(
    MovieVersionSchema.extend({ entityId: z.number(), cinemaId: z.number() })
).action(async ({parsedInput}) => {
    // Implementation for adding a movie version goes here
});