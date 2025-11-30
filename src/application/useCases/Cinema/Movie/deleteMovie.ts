import { MovieRepository } from "@/src/application/repositories/Cinema/MovieRepository";


export const deleteMovie = async (repo : MovieRepository, entityId: number, cinemaId: number, movieId: number) : Promise<void> => {
    await repo.deleteMovie(entityId, cinemaId, movieId);
}