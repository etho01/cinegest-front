import { getMovies } from "@/src/application/useCases/Cinema/Movie/getMovies";
import { getAllOptions } from "@/src/application/useCases/Cinema/Settings/Option/getAllOptions";
import { MovieManager } from "@/src/component/cinema/movie/MovieManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { MovieRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/MovieRepositoryImpl";
import { OptionsRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/OptionsRepositoryImpl";


interface OptionsPageProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MoviePage({ params, searchParams }: OptionsPageProps) {
    const { entityId, cinemaId } = await params;
    const searchParamsObj = await searchParams;
    const page = searchParamsObj.page ? Number(searchParamsObj.page) : 1;
    const search = searchParamsObj.search ? String(searchParamsObj.search) : "";
    const status = searchParamsObj.status
        ? Array.isArray(searchParamsObj.status)
            ? searchParamsObj.status.map((id) => Number(id))
            : [Number(searchParamsObj.status)]
        : undefined;

    return (
        <ShowMenu
            body={async (user, entity, cinema) => {
                const movies = await getMovies(MovieRepositoryImpl, entityId, cinemaId, { search, page, status });

                const options = await getAllOptions(OptionsRepositoryImpl, entityId, cinemaId);

                return (
                    <MovieManager
                        initialData={movies}
                        initialParams={{ search, page }}
                        entityId={entityId}
                        cinemaId={cinemaId}
                        allOptionsTypes={options}
                    />
                );
            }}
            entityId={entityId}
            cinemaId={cinemaId}
            page="cinemaMovie"

        />
    );
}