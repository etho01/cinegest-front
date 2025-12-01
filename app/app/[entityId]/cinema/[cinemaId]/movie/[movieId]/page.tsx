import { getMovie } from "@/src/application/useCases/Cinema/Movie/getMovie";
import MovieReview from "@/src/component/cinema/movie/review/MovieReview";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { MovieRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/MovieRepositoryImpl";

interface OptionsPageProps {
    params: Promise<{ entityId: number; cinemaId: number; movieId: number }>;
}

export default async function MoviePage({ params }: OptionsPageProps) {
    const { entityId, cinemaId, movieId } = await params;
    const movie = await getMovie(MovieRepositoryImpl, entityId, cinemaId, movieId);

    return (
        <ShowMenu
            body={async (user) => {
                if (!movie) {
                    return <div>Movie not found</div>;
                }

                return (
                    <MovieReview movie={movie} entityId={entityId} cinemaId={cinemaId} />
                );
            }}
            entityId={entityId}
            cinemaId={cinemaId}
            customParam={movie}
            page="cinemaMovieReview"
        />
    );
}