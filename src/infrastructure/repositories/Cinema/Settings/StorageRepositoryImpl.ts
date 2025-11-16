import { StorageRepository } from "@/src/application/repositories/Cinema/Settings/StorageRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Storage } from "@/src/domain/Cinema/Settings/Storage";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const StorageRepositoryImpl : StorageRepository = {
    getStorages: async (entityId: number, cinemaId: number, props) : Promise<Paginator<Storage>> => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage`, props, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Paginator<Storage>;
    },
    deleteStorage: async (entityId: number, cinemaId: number, storageId: number) : Promise<void> => {
        let resp =  await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage/${storageId}`, {}, {});
        await throwErrorResponse(resp);
    },
    addStorage: async (entityId: number, cinemaId: number, data: Storage) : Promise<Storage> => {
        console.log('Adding storage', data);
        let resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage`, data, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Storage;
    },
    updateStorage: async (entityId: number, cinemaId: number, data: Storage) : Promise<Storage> => {
        let resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage/${data.id}`, data, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Storage;
    },
    getAllStorages: async (entityId: number, cinemaId: number) : Promise<Storage[]> => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage/all`, {}, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Storage[];
    }
};