import { getCinemas } from "@/src/application/useCases/Cinema/getCinemas";
import { CinemaManager } from "@/src/component/cinema/CinemaManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { Unauthorized, UserHasRight } from "@/src/domain/User";
import { CinemaRepositoryImpl } from "@/src/infrastructure/repositories/CinemaRepositoryImpl";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gestion des cinémas - CineGest",
    description: "Gérez les cinémas de votre entité",
};

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

                if (UserHasRight(user, 'viewCinemas', null) === false) {
                    throw new Unauthorized('Vous n\'avez pas les droits nécessaires pour accéder à cette page.');
                }

                return (
                    <CinemaManager initialData={cinemas} initialParams={{ search, page }} entityId={entityId ? parseInt(entityId, 10) : 0} user={user} />
                );
            }}
            entityId={entityId ? parseInt(entityId, 10) : null}
            cinemaId={null}
            page="cinemaManager"
        />
    );
}