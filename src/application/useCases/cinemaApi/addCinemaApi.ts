import { CinemaApi } from "@/src/domain/CinemaApi";
import { CinemaApiRepository } from "../../repositories/CinemaApiRepository";


export const addCinemaApi = async (repo : CinemaApiRepository, entityId: number, cinemaApiData: CinemaApi) => {
    const newCinemaApi = await repo.createCinemaApi(entityId, cinemaApiData);
    return newCinemaApi;
}