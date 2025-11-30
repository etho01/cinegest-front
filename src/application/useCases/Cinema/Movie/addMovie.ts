import { MovieRepository } from "@/src/application/repositories/Cinema/MovieRepository";
import { Movie } from "@/src/domain/Cinema/Movie";

export const addMovie = async (repo : MovieRepository, entityId: number, cinemaId: number, movie: Movie) => {
    movie = await repo.addMovie(entityId, cinemaId, movie);
    return movie; // Return the added movie (with any additional data like ID)
}