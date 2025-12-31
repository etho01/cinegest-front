import { StorageTypeRepository } from "@/src/application/repositories/Cinema/Settings/StorageTypeRepository";
import { getOptionsProps } from "@/src/application/useCases/Cinema/Settings/Option/getOptions";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { StorageType } from "@/src/domain/Cinema/Settings/StorageType";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { buildApiUrl } from "@/src/lib/config/api";


export const StorageTypeRepositoryImpl : StorageTypeRepository = {
    deleteStorageType : async (entityId: number, cinemaId: number, storageTypeId: number): Promise<void> => {
        return ApiRequestServeur.deleteRequest(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage-type/${storageTypeId}`)
        );
    },
    getStorageTypes : async (entityId: number, cinemaId: number, props : getOptionsProps) => {
        return ApiRequestServeur.getAndParse<Paginator<StorageType>>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage-type`),
            props
        );
    },
    addStorageType : async (entityId: number, cinemaId: number, storageType: StorageType) : Promise<StorageType> => {
        return ApiRequestServeur.postAndParse<StorageType>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage-type`),
            storageType
        );
    },
    updateStorageType : async (entityId: number, cinemaId: number, storageType: StorageType) : Promise<StorageType> => {
        return ApiRequestServeur.putAndParse<StorageType>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage-type/${storageType.id}`),
            storageType
        );
    },
    getAllStorageTypes : async (entityId: number, cinemaId: number) : Promise<StorageType[]> => {
        return ApiRequestServeur.getAndParse<StorageType[]>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage-type/all`)
        );
    },
};