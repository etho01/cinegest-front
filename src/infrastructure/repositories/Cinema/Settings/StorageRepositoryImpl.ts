import { StorageRepository } from "@/src/application/repositories/Cinema/Settings/StorageRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Storage } from "@/src/domain/Cinema/Settings/Storage";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const StorageRepositoryImpl : StorageRepository = {
    getStorages: async (entityId: number, cinemaId: number, props) : Promise<Paginator<Storage>> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage`, props, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Paginator<Storage>;
    },
    deleteStorage: async (entityId: number, cinemaId: number, storageId: number) : Promise<void> => {
        const resp =  await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage/${storageId}`, {}, {});
        await throwErrorResponse(resp);
    },
    addStorage: async (entityId: number, cinemaId: number, data: Storage) : Promise<Storage> => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage`, data, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Storage;
    },
    updateStorage: async (entityId: number, cinemaId: number, data: Storage) : Promise<Storage> => {
        const resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage/${data.id}`, data, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Storage;
    },
    getAllStorages: async (entityId: number, cinemaId: number) : Promise<Storage[]> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/storage/all`, {}, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Storage[];
    }
};