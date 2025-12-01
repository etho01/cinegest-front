import { MovieRepository } from "@/src/application/repositories/Cinema/MovieRepository";
import { MovieVersion } from "@/src/domain/Cinema/Movie";


export const updateMovieVersion = async (repo: MovieRepository, entityId: number, cinemaId: number, movieVersion: MovieVersion) => {
    const updatedVersion = await repo.updateMovieVersion(entityId, cinemaId, movieVersion);
    return updatedVersion; // Return the updated movie version
}