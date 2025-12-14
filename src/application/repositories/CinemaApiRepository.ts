import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { PropsGetCinemaApis } from "../useCases/cinemaApi/getCinemaApis";
import { CinemaApi } from "@/src/domain/CinemaApi";


export interface CinemaApiRepository {
    getCinemaApis : (entityId: number, props: PropsGetCinemaApis) => Promise<Paginator<CinemaApi>>;
    deleteCinemaApi : (entityId: number, cinemaApiId: number) => Promise<void>;
    createCinemaApi : (entityId: number, cinemaApi: CinemaApi) => Promise<CinemaApi>;
    updateCinemaApi : (entityId: number, cinemaApi: CinemaApi) => Promise<CinemaApi>;
}