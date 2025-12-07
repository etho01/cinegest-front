"use server";
import { addMovie } from "@/src/application/useCases/Cinema/Movie/addMovie";
import { deleteMovie } from "@/src/application/useCases/Cinema/Movie/deleteMovie";
import { updateMovieSize } from "@/src/application/useCases/Cinema/Movie/updateMovieSize";
import { addMovieVersion } from "@/src/application/useCases/Cinema/Movie/Version/addMovieVersion";
import { deleteMovieVersion } from "@/src/application/useCases/Cinema/Movie/Version/deleteMovieVersion";
import { updateMovieVersion } from "@/src/application/useCases/Cinema/Movie/Version/updateMovieVersion";
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

export const addOrUpdateMovieVersionController = actionClient.schema(
    MovieVersionSchema.extend({ entityId: z.number(), cinemaId: z.number() })
).action(async ({parsedInput}) => {
    let movieVersion = {}
    if (parsedInput.id == 0)
    {
        movieVersion = await addMovieVersion(MovieRepositoryImpl, parsedInput.entityId, parsedInput.cinemaId, parsedInput);
    }
    else
    {
        movieVersion = await updateMovieVersion(MovieRepositoryImpl, parsedInput.entityId, parsedInput.cinemaId, parsedInput);
    }

    return movieVersion;
});

export const deleteMovieVersionController = actionClient.schema(
    z.object({
        entityId: z.number(),
        cinemaId: z.number(),
        movieId: z.number(),
        movieVersionId: z.number(),
    })
).action(async ({parsedInput}) => {
    await deleteMovieVersion(MovieRepositoryImpl, parsedInput.entityId, parsedInput.cinemaId, parsedInput.movieId, parsedInput.movieVersionId);
});

export const updateMovieSizeController = actionClient.schema(
    z.object({
        entityId: z.number(),
        cinemaId: z.number(),
        movieId: z.number(),
        size: z.number().min(0),
    })
).action(async ({parsedInput}) => {
    const movie = await updateMovieSize(MovieRepositoryImpl, parsedInput.entityId, parsedInput.cinemaId, parsedInput.movieId, parsedInput.size);
    return movie;
});