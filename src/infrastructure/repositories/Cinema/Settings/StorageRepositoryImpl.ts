import { StorageRepository } from "@/src/application/repositories/Cinema/Settings/StorageRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Storage } from "@/src/domain/Cinema/Settings/Storage";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { buildApiUrl } from "@/src/lib/config/api";


export const StorageRepositoryImpl : StorageRepository = {
    getStorages: async (entityId: number, cinemaId: number, props) : Promise<Paginator<Storage>> => {
        return ApiRequestServeur.getAndParse<Paginator<Storage>>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage`),
            props
        );
    },
    deleteStorage: async (entityId: number, cinemaId: number, storageId: number) : Promise<void> => {
        return ApiRequestServeur.deleteRequest(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage/${storageId}`)
        );
    },
    addStorage: async (entityId: number, cinemaId: number, data: Storage) : Promise<Storage> => {
        return ApiRequestServeur.postAndParse<Storage>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage`),
            data
        );
    },
    updateStorage: async (entityId: number, cinemaId: number, data: Storage) : Promise<Storage> => {
        return ApiRequestServeur.putAndParse<Storage>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage/${data.id}`),
            data
        );
    },
    getAllStorages: async (entityId: number, cinemaId: number) : Promise<Storage[]> => {
        return ApiRequestServeur.getAndParse<Storage[]>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage/all`)
        );
    }
};