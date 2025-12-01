import { MovieRepository } from "@/src/application/repositories/Cinema/MovieRepository";
import { MovieVersion } from "@/src/domain/Cinema/Movie";


export const addMovieVersion = async (repo: MovieRepository, entityId: number, cinemaId: number, movieVersion: MovieVersion) => {
    const addedVersion = await repo.addMovieVersion(entityId, cinemaId, movieVersion);
    return addedVersion; // Return the added movie version (with any additional data like ID)
}