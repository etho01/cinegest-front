import { KeyRepository } from "@/src/application/repositories/Cinema/KeyRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Key } from "@/src/domain/Cinema/Key";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { buildApiUrl } from "@/src/lib/config/api";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const KeyRepositoryImpl : KeyRepository = {
    getKeys : async (entityId: number, cinemaId: number, props) : Promise<Paginator<Key>> => {
        return ApiRequestServeur.getAndParse<Paginator<Key>>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/key`),
            props
        );
    },
    addKeys: async (entityId: number, cinemaId: number, keys) : Promise<void> => {
        const resp = await ApiRequestServeur.POST(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/key/addKeys`),
            keys,
            {}
        );
        await throwErrorResponse(resp);
    },
    deleteKey: async (entityId: number, cinemaId: number, keyId: number) : Promise<void> => {
        return ApiRequestServeur.deleteRequest(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/key/${keyId}`)
        );
    }
};