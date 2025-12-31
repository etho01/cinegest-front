import { MovieRepository } from "@/src/application/repositories/Cinema/MovieRepository";
import { PropsGetMovies } from "@/src/application/useCases/Cinema/Movie/getMovies";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Movie, MovieSearchResult, MovieVersion } from "@/src/domain/Cinema/Movie";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { buildApiUrl } from "@/src/lib/config/api";


export const MovieRepositoryImpl : MovieRepository = {
    getMovies : async (entityId : number, cinemaId: number, props : PropsGetMovies) : Promise<Paginator<Movie>> => {
        return ApiRequestServeur.getAndParse<Paginator<Movie>>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/movie`),
            props
        );
    },
    search : async (entityId: number, cinemaId: number, search : string) : Promise<MovieSearchResult[]> => {
        return ApiRequestServeur.getAndParse<MovieSearchResult[]>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/movie/search`),
            { search }
        );
    },
    addMovie : async (entityId: number, cinemaId: number, movie : Movie) : Promise<Movie> => {
        return ApiRequestServeur.postAndParse<Movie>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/movie`),
            movie
        );
    },
    deleteMovie : async (entityId: number, cinemaId: number, movieId: number) : Promise<void> => {
        return ApiRequestServeur.deleteRequest(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/movie/${movieId}`)
        );
    },
    getMovie : async (entityId: number, cinemaId: number, movieId: number) : Promise<Movie> => {
        return ApiRequestServeur.getAndParse<Movie>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/movie/${movieId}`)
        );
    },
    addMovieVersion : async (entityId: number, cinemaId: number, movieVersion: MovieVersion) : Promise<MovieVersion> => {
        return ApiRequestServeur.postAndParse<MovieVersion>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/movie/${movieVersion.movieId}/version`),
            movieVersion
        );
    },
    updateMovieVersion: async (entityId: number, cinemaId: number, movieVersion: MovieVersion) : Promise<MovieVersion> => {
        return ApiRequestServeur.putAndParse<MovieVersion>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/movie/${movieVersion.movieId}/version/${movieVersion.id}`),
            movieVersion
        );
    },
    deleteMovieVersion : async (entityId: number, cinemaId: number, movieId: number, versionId: number) : Promise<void> => {
        return ApiRequestServeur.deleteRequest(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/movie/${movieId}/version/${versionId}`)
        );
    },
    getAllActiveByCinema: async (entityId: number, cinemaId: number) : Promise<Movie[]> => {
        return ApiRequestServeur.getAndParse<Movie[]>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/movie/active/all`)
        );
    },
    updateMovieSize : async (entityId: number, cinemaId: number, movieId: number, size: number) : Promise<Movie> => {
        return ApiRequestServeur.putAndParse<Movie>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/movie/${movieId}/size`),
            { size }
        );
    },
    searchMovieVersion : async (entityId: number, cinemaId: number, search : string) : Promise<MovieVersion[]> => {
        return ApiRequestServeur.getAndParse<MovieVersion[]>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/movie/version/search`),
            { search }
        );
    },
}