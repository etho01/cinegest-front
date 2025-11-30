import { MovieRepository } from "@/src/application/repositories/Cinema/MovieRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Movie } from "@/src/domain/Cinema/Movie";

export type PropsGetMovies = {
    search : string;
    page : number;
    status?: number[];
};

export const getMovies = async (repo : MovieRepository, entityId: number, cinemaId: number, props: PropsGetMovies) : Promise<Paginator<Movie>> => {
    let movies = await repo.getMovies(entityId, cinemaId, props);
    return movies;
}