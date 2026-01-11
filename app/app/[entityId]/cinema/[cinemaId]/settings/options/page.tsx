import { getOptions } from "@/src/application/useCases/Cinema/Settings/Option/getOptions";
import { getAllOptionsTypes } from "@/src/application/useCases/Cinema/Settings/OptionTypes/getAllOptionsTypes";
import { OptionManager } from "@/src/component/cinema/settings/option/OptionManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { Unauthorized, UserHasRight } from "@/src/domain/User";
import { OptionsRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/OptionsRepositoryImpl";
import { OptionTypesRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/OptionTypesControllerImpl";
import { getObjectFromSearchParams } from "@/src/lib/url";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gestion des options - CineGest",
    description: "Gérez les options de votre cinéma",
};

interface OptionsPageProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function OptionsSettingsPage({ params, searchParams }: OptionsPageProps) {
    const { entityId, cinemaId } = await params;
    const searchParamsObj = await searchParams;
    const page = searchParamsObj.page ? Number(searchParamsObj.page) : 1;
    const search = searchParamsObj.search ? String(searchParamsObj.search) : "";
    
    const optionTypes = getObjectFromSearchParams(searchParamsObj, 'optionTypes').map((v) => parseInt(v));


    return (
        <ShowMenu
            body={async (user) => {
                if (UserHasRight(user, 'viewOptions', cinemaId) === false) {
                    throw new Unauthorized('Vous n\'avez pas les droits nécessaires pour accéder à cette page.');
                }
                const options = await getOptions(OptionsRepositoryImpl, entityId, cinemaId, { search, page, optionTypes });

                const allOptionsType = await getAllOptionsTypes(OptionTypesRepositoryImpl, entityId, cinemaId);
                
                return (
                    <OptionManager
                        initialData={options}
                        initialParams={{ search, page, optionTypes }}
                        entityId={entityId}
                        cinemaId={cinemaId}
                        allOptionsTypes={allOptionsType}
                        user={user}
                    />
                );
            }}
            page="cinemaOptionsSettings"
            entityId={entityId}
            cinemaId={cinemaId}
        />
    );
}