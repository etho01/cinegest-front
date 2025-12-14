import { getAllCinemasByEntity } from "@/src/application/useCases/Cinema/getAllCinemasByEntity";
import { getCinemaApis } from "@/src/application/useCases/cinemaApi/getCinemaApis";
import { CinemaApiManager } from "@/src/component/cinemaApi/CinemaApiManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { Unauthorized, UserHasRight } from "@/src/domain/User";
import { CinemaApiRepositoryImpl } from "@/src/infrastructure/repositories/CinemaApiRepositoryImpt";
import { CinemaRepositoryImpl } from "@/src/infrastructure/repositories/CinemaRepositoryImpl";
import { getObjectFromSearchParams } from "@/src/lib/url";


interface CinemaApiPageProps {
    params: Promise<{ entityId: number }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page(props: CinemaApiPageProps) {
    const { params, searchParams } = props;
    const { entityId } = await params;
    const searchParamsObj = await searchParams;
    const page = searchParamsObj.page ? Number(searchParamsObj.page) : 1;
    const search = searchParamsObj.search ? String(searchParamsObj.search) : "";
    const cinemaIds = getObjectFromSearchParams(searchParamsObj, 'cinemaIds');

    return (
        <ShowMenu
            body={async (user) => {
                const cinemas = await getAllCinemasByEntity(CinemaRepositoryImpl, entityId);
                const cinemaApi = await getCinemaApis(
                    CinemaApiRepositoryImpl, 
                    entityId, 
                    { page, search, cinemaIds: cinemaIds.length ? cinemaIds.map((id) => Number(id)) : undefined }
                );

                if (UserHasRight(user, 'viewCinemaApis', null) === false) {
                    throw new Unauthorized('Vous n\'avez pas les droits nécessaires pour accéder à cette page.');
                }

                return (
                    <CinemaApiManager 
                        cinemas={cinemas} 
                        initialData={cinemaApi} 
                        initialParams={{ search, page, cinemaIds: cinemaIds.length ? cinemaIds.map((id) => Number(id)) : undefined }} 
                        entityId={entityId} 
                        user={user} 
                    />
                );
            }}
            entityId={entityId}
            cinemaId={null}
            page="cinemaApi"
        />
    );
}