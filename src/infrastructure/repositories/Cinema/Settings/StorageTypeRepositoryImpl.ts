import { StorageTypeRepository } from "@/src/application/repositories/Cinema/Settings/StorageTypeRepository";
import { getOptionsProps } from "@/src/application/useCases/Cinema/Settings/Option/getOptions";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { StorageType } from "@/src/domain/Cinema/Settings/StorageType";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const StorageTypeRepositoryImpl : StorageTypeRepository = {
    deleteStorageType : async (entityId: number, cinemaId: number, storageTypeId: number): Promise<void> => {
        let resp = await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage-type/${storageTypeId}`, {}, {});
        await throwErrorResponse(resp);
    },
    getStorageTypes : async (entityId: number, cinemaId: number, props : getOptionsProps) => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage-type`, props, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Paginator<StorageType>;
    },
    addStorageType : async (entityId: number, cinemaId: number, storageType: StorageType) : Promise<StorageType> => {
        let resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage-type`, storageType, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as StorageType;
    },
    updateStorageType : async (entityId: number, cinemaId: number, storageType: StorageType) : Promise<StorageType> => {
        let resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage-type/${storageType.id}`, storageType, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as StorageType;
    },
    getAllStorageTypes : async (entityId: number, cinemaId: number) : Promise<StorageType[]> => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage-type/all`, {}, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as StorageType[];
    },
};