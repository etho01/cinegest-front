import { CinemaApiRepository } from "@/src/application/repositories/CinemaApiRepository";


export const deletePrice = async (repository: CinemaApiRepository, entityId: number, cinemaApiId: number, priceId: number): Promise<void> => {
    await repository.deletePrice(entityId, cinemaApiId, priceId);
}