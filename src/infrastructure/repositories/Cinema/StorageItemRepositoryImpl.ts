import { StorageItemRepository } from "@/src/application/repositories/Cinema/StorageItemRepository";
import { addStorageItemObjectParams } from "@/src/application/useCases/Cinema/StorageItem/addStorageItems";
import { PropsGetStorageItems } from "@/src/application/useCases/Cinema/StorageItem/getStorageItems";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { StorageItem } from "@/src/domain/Cinema/StorageItem";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const StorageItemRepositoryImpl : StorageItemRepository = {
    getStorageItems : async (entityId : number, cinemaId: number, props: PropsGetStorageItems) : Promise<Paginator<StorageItem>> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/storage-item`, props, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Paginator<StorageItem>;
    },
    addStorageItems : async (entityId : number, cinemaId: number, params: addStorageItemObjectParams) : Promise<StorageItem> => {
        console.log(params);
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/storage-item/stores`, params, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as StorageItem;
    },
    deleteStorageItem : async (entityId : number, cinemaId: number, storageItemId: number) : Promise<void> => {
        const resp = await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/storage-item/${storageItemId}`, {}, {});
        await throwErrorResponse(resp);
    }
};