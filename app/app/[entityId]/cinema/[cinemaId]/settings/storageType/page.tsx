import { getStorageTypes } from "@/src/application/useCases/Cinema/Settings/StorageType/getStorageTypes";
import { StorageTypeManager } from "@/src/component/cinema/settings/storageType/StorageTypeManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { Unauthorized, UserHasRight } from "@/src/domain/User";
import { StorageTypeRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/StorageTypeRepositoryImpl";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gestion des types de stockage - CineGest",
    description: "Gérez les types de stockage de votre cinéma",
};

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
            body={async (user) => {
                if (UserHasRight(user, 'viewStorageTypes', cinemaId) === false) {
                    throw new Unauthorized('Vous n\'avez pas les droits nécessaires pour accéder à cette page.');
                }

                const storageTypes = await getStorageTypes(StorageTypeRepositoryImpl, entityId, cinemaId, { page, search });

                return (
                    <StorageTypeManager
                        initialData={storageTypes}
                        initialParams={{ search, page }}
                        entityId={entityId}
                        cinemaId={cinemaId}
                        user={user}
                    />
                );
            }}
            page="cinemaStorageTypesSettings"
            entityId={entityId}
            cinemaId={cinemaId}
        />
    );
}