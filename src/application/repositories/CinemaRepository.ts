import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Cinema } from "@/src/domain/Cinema";


export interface CinemaRepository {
    getCinemas : (entityId : number, search : string, page : number) => Promise<Paginator<Cinema>>;
    addCinema : (entityId : number, cinema : Cinema) => Promise<Cinema>;
}