import { MovieRepository } from "@/src/application/repositories/Cinema/MovieRepository";
import { PropsGetMovies } from "@/src/application/useCases/Cinema/Movie/getMovies";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Movie, MovieSearchResult, MovieVersion } from "@/src/domain/Cinema/Movie";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const MovieRepositoryImpl : MovieRepository = {
    getMovies : async (entityId : number, cinemaId: number, props : PropsGetMovies) : Promise<Paginator<Movie>> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/movie`, props, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Paginator<Movie>;
    },
    search : async (entityId: number, cinemaId: number, search : string) : Promise<MovieSearchResult[]> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/movie/search`, { search }, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as MovieSearchResult[];
    },
    addMovie : async (entityId: number, cinemaId: number, movie : Movie) : Promise<Movie> => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/movie`, movie, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Movie;
    },
    deleteMovie : async (entityId: number, cinemaId: number, movieId: number) : Promise<void> => {
        const resp = await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/movie/${movieId}`, {}, {});
        await throwErrorResponse(resp);
    },
    getMovie : async (entityId: number, cinemaId: number, movieId: number) : Promise<Movie> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/movie/${movieId}`, {}, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Movie;
    },
    addMovieVersion : async (entityId: number, cinemaId: number, movieVersion: MovieVersion) : Promise<MovieVersion> => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/movie/${movieVersion.movieId}/version`, movieVersion, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as MovieVersion;
    },
    updateMovieVersion: async (entityId: number, cinemaId: number, movieVersion: MovieVersion) : Promise<MovieVersion> => {
        const resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/movie/${movieVersion.movieId}/version/${movieVersion.id}`, movieVersion, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as MovieVersion;
    },
    deleteMovieVersion : async (entityId: number, cinemaId: number, movieId: number, versionId: number) : Promise<void> => {
        const resp = await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/movie/${movieId}/version/${versionId}`, {}, {});
        await throwErrorResponse(resp);
    },
    getAllActiveByCinema: async (entityId: number, cinemaId: number) : Promise<Movie[]> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/movie/active/all`, {}, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Movie[];
    },
}