import { MovieRepository } from "@/src/application/repositories/Cinema/MovieRepository";


export const deleteMovieVersion = async (movieRepository: MovieRepository, entityId: number, cinemaId: number, movieId: number, versionId: number) : Promise<void> => {
    return await movieRepository.deleteMovieVersion(entityId, cinemaId, movieId, versionId);
}