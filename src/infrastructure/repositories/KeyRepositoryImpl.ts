import { KeyRepository } from "@/src/application/repositories/Cinema/KeyRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Key } from "@/src/domain/Cinema/Key";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const KeyRepositoryImpl : KeyRepository = {
    getKeys : async (entityId: number, cinemaId: number, props) : Promise<Paginator<Key>> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/key`, props, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Paginator<Key>;
    },
    addKeys: async (entityId: number, cinemaId: number, keys) : Promise<void> => {
        console.log(keys);
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/key/addKeys`, keys, {});
        console.log(await resp.text());
        await throwErrorResponse(resp);
    },
    deleteKey: async (entityId: number, cinemaId: number, keyId: number) : Promise<void> => {
        const resp = await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/key/${keyId}`, {}, {});
        await throwErrorResponse(resp);
    }
};