import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { PropsGetCinemaApis } from "../useCases/cinemaApi/getCinemaApis";
import { CinemaApi, Price } from "@/src/domain/CinemaApi";


export interface CinemaApiRepository {
    getCinemaApis : (entityId: number, props: PropsGetCinemaApis) => Promise<Paginator<CinemaApi>>;
    deleteCinemaApi : (entityId: number, cinemaApiId: number) => Promise<void>;
    createCinemaApi : (entityId: number, cinemaApi: CinemaApi) => Promise<CinemaApi>;
    updateCinemaApi : (entityId: number, cinemaApi: CinemaApi) => Promise<CinemaApi>;
    getCinemaApi : (entityId: number, cinemaApiId: number) => Promise<CinemaApi>;
    addPrice : (entityId: number, cinemaApiId: number, price: Price) => Promise<Price>;
    updatePrice : (entityId: number, cinemaApiId: number, price: Price) => Promise<Price>;
    deletePrice : (entityId: number, cinemaApiId: number, priceId: number) => Promise<void>;
}