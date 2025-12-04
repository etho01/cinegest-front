import { MovieRepository } from "@/src/application/repositories/Cinema/MovieRepository";


export const searchMovieVersion = async (repository: MovieRepository, entityId: number, cinemaId: number, search : string) => {
    return repository.searchMovieVersion(entityId, cinemaId, search);
}