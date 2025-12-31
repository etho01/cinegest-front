import { StorageItemRepository } from "@/src/application/repositories/Cinema/StorageItemRepository";
import { addStorageItemObjectParams } from "@/src/application/useCases/Cinema/StorageItem/addStorageItems";
import { PropsGetStorageItems } from "@/src/application/useCases/Cinema/StorageItem/getStorageItems";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { StorageItem } from "@/src/domain/Cinema/StorageItem";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { buildApiUrl } from "@/src/lib/config/api";


export const StorageItemRepositoryImpl : StorageItemRepository = {
    getStorageItems : async (entityId : number, cinemaId: number, props: PropsGetStorageItems) : Promise<Paginator<StorageItem>> => {
        return ApiRequestServeur.getAndParse<Paginator<StorageItem>>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/storage-item`),
            props
        );
    },
    addStorageItems : async (entityId : number, cinemaId: number, params: addStorageItemObjectParams) : Promise<StorageItem> => {
        return ApiRequestServeur.postAndParse<StorageItem>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/storage-item/stores`),
            params
        );
    },
    deleteStorageItem : async (entityId : number, cinemaId: number, storageItemId: number) : Promise<void> => {
        return ApiRequestServeur.deleteRequest(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/storage-item/${storageItemId}`)
        );
    }
};