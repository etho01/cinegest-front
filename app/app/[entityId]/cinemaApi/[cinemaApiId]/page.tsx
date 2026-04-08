import { getCinemaApi } from "@/src/application/useCases/cinemaApi/getCinemaApi";
import { CinemaApiReview } from "@/src/component/cinemaApi/review/CinemaApiReview";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { Unauthorized, UserHasRight } from "@/src/domain/User";
import { CinemaApiRepositoryImpl } from "@/src/infrastructure/repositories/CinemaApiRepositoryImpt";
import { Metadata } from "next";

export async function generateMetadata(props: CinemaApiPageProps): Promise<Metadata> {
    const { params } = props;
    const { entityId, cinemaApiId } = await params;
    const cinemaApi = await getCinemaApi(CinemaApiRepositoryImpl, entityId, cinemaApiId);
    
    return {
        title: `${cinemaApi.name} - API Cinéma - CineGest`,
        description: `Gestion de l'API cinéma ${cinemaApi.name}`,
    };
}

interface CinemaApiPageProps {
    params: Promise<{ entityId: number; cinemaApiId: number }>;
}

export default async function Page (props: CinemaApiPageProps) {
    const { params } = props;
    const { entityId, cinemaApiId } = await params;

    return (
        <ShowMenu
            body={async (user) => {
                const cinemaApi = await getCinemaApi(CinemaApiRepositoryImpl, entityId, cinemaApiId);

                if (UserHasRight(user, 'viewCinemaApis', null) === false) {
                    throw new Unauthorized('Vous n\'avez pas les droits nécessaires pour accéder à cette page.');
                }

                return (
                    <CinemaApiReview user={user} cinemaApi={cinemaApi} entityId={entityId} />
                );
            }}
            entityId={entityId}
            cinemaId={null}
            page="cinemaApi"
        />
    )
}