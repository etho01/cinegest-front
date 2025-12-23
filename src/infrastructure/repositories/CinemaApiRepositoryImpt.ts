import { CinemaApiRepository } from "@/src/application/repositories/CinemaApiRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { CinemaApi, Price } from "@/src/domain/CinemaApi";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const CinemaApiRepositoryImpl : CinemaApiRepository = {
    getCinemaApis: async (entityId, props) => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinema-api`, props, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Paginator<CinemaApi>;
    },
    deleteCinemaApi: async (entityId, cinemaApiId) => {
        const resp = await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/cinema-api/${cinemaApiId}`, {}, {});
        await throwErrorResponse(resp);
    },
    createCinemaApi: async (entityId, cinemaApi) => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/cinema-api`, cinemaApi, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as CinemaApi;
    },
    updateCinemaApi: async (entityId, cinemaApi) => {
        const resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/entity/${entityId}/cinema-api/${cinemaApi.id}`, cinemaApi, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as CinemaApi;
    },
    getCinemaApi: async (entityId, cinemaApiId) => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinema-api/${cinemaApiId}`, {}, {});
        await throwErrorResponse(resp);
        const text = await resp.text();
        const body = JSON.parse(text);
        return body as CinemaApi;
    },
    addPrice: async (entityId, cinemaApiId, price) => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/cinema-api/${cinemaApiId}/price`, price, {});
        await throwErrorResponse(resp);
        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Price;
    },
    updatePrice: async (entityId, cinemaApiId, price) => {
        const resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/entity/${entityId}/cinema-api/${cinemaApiId}/price/${price.id}`, price, {});
        await throwErrorResponse(resp);
        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Price;
    },
    deletePrice: async (entityId, cinemaApiId, priceId) => {
        const resp = await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/cinema-api/${cinemaApiId}/price/${priceId}`, {}, {});
        await throwErrorResponse(resp);
    }
};