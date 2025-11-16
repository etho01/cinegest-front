import { getStorageTypes } from "@/src/application/useCases/Cinema/Settings/StorageType/getStorageTypes";
import { StorageTypeManager } from "@/src/component/cinema/settings/storageType/StorageTypeManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { StorageTypeRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/StorageTypeRepositoryImpl";


interface StorageTypesPageProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function StorageTypesSettingsPage({ params, searchParams }: StorageTypesPageProps) {
    const { entityId, cinemaId } = await params;
    const searchParamsObj = await searchParams;
    const page = searchParamsObj.page ? Number(searchParamsObj.page) : 1;
    const search = searchParamsObj.search ? String(searchParamsObj.search) : "";

    return (
        <ShowMenu
            body={async (user, entity, cinema) => {
                let storageTypes = await getStorageTypes(StorageTypeRepositoryImpl, entityId, cinemaId, { page, search });

                return (
                    <StorageTypeManager
                        initialData={storageTypes}
                        initialParams={{ search, page }}
                        entityId={entityId}
                        cinemaId={cinemaId}
                    />
                );
            }}
            page="cinemaStorageTypesSettings"
            entityId={entityId}
            cinemaId={cinemaId}
        />
    );
}