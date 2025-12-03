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
    }
};