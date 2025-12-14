import { CinemaApiRepository } from "../../repositories/CinemaApiRepository";


export const deleteCinemaApi = async (repo : CinemaApiRepository, entityId: number, cinemaApiId: number): Promise<void> => {
    await repo.deleteCinemaApi(entityId, cinemaApiId);
};