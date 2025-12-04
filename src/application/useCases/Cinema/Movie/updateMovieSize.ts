import { MovieRepository } from "@/src/application/repositories/Cinema/MovieRepository";


export const updateMovieSize = async (repo : MovieRepository ,entityId: number, cinemaId: number, movieId: number, size: number) => {
    const movie = await repo.updateMovieSize(entityId, cinemaId, movieId, size);
    return movie;
}