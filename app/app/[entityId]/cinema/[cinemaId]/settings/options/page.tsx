import { getOptions } from "@/src/application/useCases/Cinema/Settings/Option/getOptions";
import { getAllOptionsTypes } from "@/src/application/useCases/Cinema/Settings/OptionTypes/getAllOptionsTypes";
import { OptionManager } from "@/src/component/cinema/settings/option/OptionManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { OptionsRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/OptionsRepositoryImpl";
import { OptionTypesRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/OptionTypesControllerImpl";


interface OptionsPageProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function OptionsSettingsPage({ params, searchParams }: OptionsPageProps) {
    const { entityId, cinemaId } = await params;
    const searchParamsObj = await searchParams;
    const page = searchParamsObj.page ? Number(searchParamsObj.page) : 1;
    const search = searchParamsObj.search ? String(searchParamsObj.search) : "";
    
    const optionTypes = searchParamsObj.optionTypes
        ? Array.isArray(searchParamsObj.optionTypes)
            ? searchParamsObj.optionTypes.map((id) => Number(id))
            : [Number(searchParamsObj.optionTypes)]
        : undefined;


    return (
        <ShowMenu
            body={async (user, entity, cinema) => {
                const options = await getOptions(OptionsRepositoryImpl, entityId, cinemaId, { search, page, optionTypes });

                const allOptionsType = await getAllOptionsTypes(OptionTypesRepositoryImpl, entityId, cinemaId);
                console.log("optionTypes", optionTypes);
                
                return (
                    <OptionManager
                        initialData={options}
                        initialParams={{ search, page, optionTypes }}
                        entityId={entityId}
                        cinemaId={cinemaId}
                        allOptionsTypes={allOptionsType}
                    />
                );
            }}
            page="cinemaOptionsSettings"
            entityId={entityId}
            cinemaId={cinemaId}
        />
    );
}