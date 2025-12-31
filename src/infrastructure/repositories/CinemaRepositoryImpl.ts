import { CinemaRepository } from "@/src/application/repositories/CinemaRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Cinema } from "@/src/domain/Cinema";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { buildApiUrl } from "@/src/lib/config/api";


export const CinemaRepositoryImpl: CinemaRepository = {
    getCinemas : async (entityId : number, search : string, page : number) : Promise<Paginator<Cinema>> => {
        return ApiRequestServeur.getAndParse<Paginator<Cinema>>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas`),
            { search, page }
        );
    },
    addCinema : async (entityId : number, cinema : Cinema) : Promise<Cinema> => {
        return ApiRequestServeur.postAndParse<Cinema>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas`),
            cinema
        );
    },
    updateCinema : async (entityId : number, cinema : Cinema) : Promise<Cinema> => {
        return ApiRequestServeur.putAndParse<Cinema>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinema.id}`),
            cinema
        );
    },
    deleteCinema : async (entityId : number, cinemaId : number) : Promise<void> => {
        return ApiRequestServeur.deleteRequest(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}`)
        );
    },
    getAllCinemasByEntity : async (entityId : number) : Promise<Cinema[]> => {
        return ApiRequestServeur.getAndParse<Cinema[]>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/all`)
        );
    }
};