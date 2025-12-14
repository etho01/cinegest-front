import { CinemaApiRepository } from "../../repositories/CinemaApiRepository";


export type PropsGetCinemaApis = {
    page : number;
    search?: string;
    cinemaIds?: number[];
};

export const getCinemaApis = async (repo: CinemaApiRepository, entityId: number, props: PropsGetCinemaApis) => {
    const cinemaApis = await repo.getCinemaApis(entityId, props);
    return cinemaApis
}