import { MovieRepository } from "@/src/application/repositories/Cinema/MovieRepository";
import { Movie } from "@/src/domain/Cinema/Movie";


export const getMovie = async (movieRepository: MovieRepository, entityId: number, cinemaId: number, movieId: number) : Promise<Movie> => {
    return await movieRepository.getMovie(entityId, cinemaId, movieId);
};