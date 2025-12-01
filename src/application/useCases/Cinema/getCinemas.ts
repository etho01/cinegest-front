import { Cinema } from "@/src/domain/Cinema";
import { CinemaRepository } from "../../repositories/CinemaRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";

export type PropsGetCinemas = {
    entityId : number;
    search : string;
    page : number;
};

export const getCinemas = async (repo : CinemaRepository, props : PropsGetCinemas) : Promise<Paginator<Cinema>> => {
    const cinemas = await repo.getCinemas(props.entityId, props.search, props.page);
    return cinemas;
}