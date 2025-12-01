import { MovieRepository } from "@/src/application/repositories/Cinema/MovieRepository";
import { PropsGetMovies } from "@/src/application/useCases/Cinema/Movie/getMovies";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Movie, MovieSearchResult } from "@/src/domain/Cinema/Movie";
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
    }
}