import { getStorages } from "@/src/application/useCases/Cinema/Settings/Storage/getStorages";
import { getAllStorageTypes } from "@/src/application/useCases/Cinema/Settings/StorageType/getAllStorageTypes";
import { StorageManager } from "@/src/component/cinema/settings/storage/StorageManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { Unauthorized, UserHasRight } from "@/src/domain/User";
import { StorageRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/StorageRepositoryImpl";
import { StorageTypeRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/StorageTypeRepositoryImpl";
import { getObjectFromSearchParams } from "@/src/lib/url";


interface StoragesPageProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function StoragesSettingsPage ({ params, searchParams }: StoragesPageProps) {
    const { entityId, cinemaId } = await params;
    const searchParamsObj = await searchParams;
    const page = searchParamsObj.page ? Number(searchParamsObj.page) : 1;
    const search = searchParamsObj.search ? String(searchParamsObj.search) : "";
    const storageTypes = getObjectFromSearchParams(searchParamsObj, 'storageTypes').map((v) => parseInt(v));

    return (
        <ShowMenu
            body={async (user) => {
                if (UserHasRight(user, 'viewStorage', cinemaId) === false) {
                    throw new Unauthorized('Vous n\'avez pas les droits nécessaires pour accéder à cette page.');
                }

                const storage = await getStorages(StorageRepositoryImpl, entityId, cinemaId, { page, search, storageTypes: storageTypes });
                const allStorageTypes = await getAllStorageTypes(StorageTypeRepositoryImpl, entityId, cinemaId);

                return (
                    <StorageManager
                        initialData={storage}
                        initialParams={{ page, search, storageTypes }}
                        entityId={entityId}
                        cinemaId={cinemaId}
                        allStorageTypes={allStorageTypes}
                        user={user}
                    />
                );
            }}
            page="cinemaStoragesSettings"
            entityId={entityId}
            cinemaId={cinemaId}
        />
    );
}