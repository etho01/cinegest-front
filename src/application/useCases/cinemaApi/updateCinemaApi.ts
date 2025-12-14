import { CinemaApi } from "@/src/domain/CinemaApi";
import { CinemaApiRepository } from "../../repositories/CinemaApiRepository";


export const updateCinemaApi = async (repo : CinemaApiRepository, entityId: number, cinemaApi: CinemaApi) => {
    const updatedCinemaApi = await repo.updateCinemaApi(entityId, cinemaApi);
    return updatedCinemaApi;
}