import { CinemaRepository } from "@/src/application/repositories/CinemaRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Cinema } from "@/src/domain/Cinema";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const CinemaRepositoryImpl: CinemaRepository = {
    getCinemas : async (entityId : number, search : string, page : number) : Promise<Paginator<Cinema>> => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas`, { search, page }, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Paginator<Cinema>;
    },
    addCinema : async (entityId : number, cinema : Cinema) : Promise<Cinema> => {
        let resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/cinemas`, cinema, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Cinema;
    },
    updateCinema : async (entityId : number, cinema : Cinema) : Promise<Cinema> => {
        let resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinema.id}`, cinema, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Cinema;
    },
    deleteCinema : async (entityId : number, cinemaId : number) : Promise<void> => {
        await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}`, {}, {});
    }
};