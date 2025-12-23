import { CinemaApiRepository } from "../../repositories/CinemaApiRepository";


export const getCinemaApi = async (repo: CinemaApiRepository, entityId: number, cinemaApiId: number) => {
    const cinemaApi = await repo.getCinemaApi(entityId, cinemaApiId);
    return cinemaApi;
}