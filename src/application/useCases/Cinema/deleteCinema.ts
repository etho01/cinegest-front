import { CinemaRepository } from "../../repositories/CinemaRepository";


export const deleteCinema = async (repository: CinemaRepository, entityId: number, cinemaId: number) => {
    await repository.deleteCinema(entityId, cinemaId);
};