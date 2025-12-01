import { getCinemas } from "@/src/application/useCases/Cinema/getCinemas";
import { CinemaManager } from "@/src/component/cinema/CinemaManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { CinemaRepositoryImpl } from "@/src/infrastructure/repositories/CinemaRepositoryImpl";


interface CinemaPageProps {
    params: Promise<{ entityId: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CinemaPage({ params, searchParams }: CinemaPageProps) {
    const { entityId } = await params;
    const searchParamsObj = await searchParams;
    const page = searchParamsObj.page ? Number(searchParamsObj.page) : 1;
    const search = searchParamsObj.search ? String(searchParamsObj.search) : "";

    return (
        <ShowMenu
            body={async (user) => {
                const cinemas = await getCinemas(CinemaRepositoryImpl, {
                    entityId: entityId ? parseInt(entityId, 10) : 0,
                    search: search,
                    page: page,
                });

                return (
                    <CinemaManager initialData={cinemas} initialParams={{ search, page }} entityId={entityId ? parseInt(entityId, 10) : 0} />
                );
            }}
            entityId={entityId ? parseInt(entityId, 10) : null}
            cinemaId={null}
            page="cinemaManager"
        />
    );
}