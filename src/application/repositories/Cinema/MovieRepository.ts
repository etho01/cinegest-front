import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Movie, MovieSearchResult } from "@/src/domain/Cinema/Movie";
import { PropsGetMovies } from "../../useCases/Cinema/Movie/getMovies";


export interface MovieRepository {
    getMovies : (entityId : number, cinemaId: number, props: PropsGetMovies) => Promise<Paginator<Movie>>;
    search : (entityId: number, cinemaId: number, search : string) => Promise<MovieSearchResult[]>;
    addMovie : (entityId: number, cinemaId: number, movie : Movie) => Promise<Movie>;
    deleteMovie : (entityId: number, cinemaId: number, movieId: number) => Promise<void>;
    getMovie : (entityId: number, cinemaId: number, movieId: number) => Promise<Movie>;
}