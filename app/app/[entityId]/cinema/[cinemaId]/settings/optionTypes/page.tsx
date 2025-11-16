import { getOptionsTypes } from "@/src/application/useCases/Cinema/Settings/OptionTypes/getOptionsTypes";
import { OptionTypeManager } from "@/src/component/cinema/settings/optionType/OptionTypeManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { OptionTypesRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/OptionTypesControllerImpl";

interface OptionTypesPageProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function OptionTypesSettingsPage({ params, searchParams }: OptionTypesPageProps) {
    const { entityId, cinemaId } = await params;
    const searchParamsObj = await searchParams;
    const page = searchParamsObj.page ? Number(searchParamsObj.page) : 1;
    const search = searchParamsObj.search ? String(searchParamsObj.search) : "";

    return (
        <ShowMenu
            body={async (user, entity, cinema) => {
                const optionTypes = await getOptionsTypes(OptionTypesRepositoryImpl, entityId, cinemaId, { search, page });
                
                return (
                    <OptionTypeManager
                        initialData={optionTypes}
                        initialParams={{ search, page }}
                        entityId={entityId}
                        cinemaId={cinemaId}
                    />
                );
            }}
            page="cinemaOptionTypesSettings"
            entityId={entityId}
            cinemaId={cinemaId}
        />
    );
}