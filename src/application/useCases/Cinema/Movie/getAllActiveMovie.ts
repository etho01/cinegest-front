import { MovieRepository } from "@/src/application/repositories/Cinema/MovieRepository";
import { Movie } from "@/src/domain/Cinema/Movie";

export const getAllActiveMovie = async (repo : MovieRepository, entityId: number, cinemaId: number): Promise<Movie[]> => {
    return await repo.getAllActiveByCinema(entityId, cinemaId);
}