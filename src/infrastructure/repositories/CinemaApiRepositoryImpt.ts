import { CinemaApiRepository } from "@/src/application/repositories/CinemaApiRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { CinemaApi, Price } from "@/src/domain/CinemaApi";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { buildApiUrl } from "@/src/lib/config/api";


export const CinemaApiRepositoryImpl : CinemaApiRepository = {
    getCinemaApis: async (entityId, props) => {
        return ApiRequestServeur.getAndParse<Paginator<CinemaApi>>(
            buildApiUrl(`api/app/entity/${entityId}/cinema-api`),
            props
        );
    },
    deleteCinemaApi: async (entityId, cinemaApiId) => {
        return ApiRequestServeur.deleteRequest(
            buildApiUrl(`api/app/entity/${entityId}/cinema-api/${cinemaApiId}`)
        );
    },
    createCinemaApi: async (entityId, cinemaApi) => {
        return ApiRequestServeur.postAndParse<CinemaApi>(
            buildApiUrl(`api/app/entity/${entityId}/cinema-api`),
            cinemaApi
        );
    },
    updateCinemaApi: async (entityId, cinemaApi) => {
        return ApiRequestServeur.putAndParse<CinemaApi>(
            buildApiUrl(`api/app/entity/${entityId}/cinema-api/${cinemaApi.id}`),
            cinemaApi
        );
    },
    getCinemaApi: async (entityId, cinemaApiId) => {
        return ApiRequestServeur.getAndParse<CinemaApi>(
            buildApiUrl(`api/app/entity/${entityId}/cinema-api/${cinemaApiId}`)
        );
    },
    addPrice: async (entityId, cinemaApiId, price) => {
        return ApiRequestServeur.postAndParse<Price>(
            buildApiUrl(`api/app/entity/${entityId}/cinema-api/${cinemaApiId}/price`),
            price
        );
    },
    updatePrice: async (entityId, cinemaApiId, price) => {
        return ApiRequestServeur.putAndParse<Price>(
            buildApiUrl(`api/app/entity/${entityId}/cinema-api/${cinemaApiId}/price/${price.id}`),
            price
        );
    },
    deletePrice: async (entityId, cinemaApiId, priceId) => {
        return ApiRequestServeur.deleteRequest(
            buildApiUrl(`api/app/entity/${entityId}/cinema-api/${cinemaApiId}/price/${priceId}`)
        );
    }
};