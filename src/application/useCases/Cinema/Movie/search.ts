import { MovieRepository } from "@/src/application/repositories/Cinema/MovieRepository";


export const searchMovie = async (repository: MovieRepository, entityId: number, cinemaId: number, search : string) => {
    return repository.search(entityId, cinemaId, search);
}