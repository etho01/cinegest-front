import { CinemaApiRepository } from "@/src/application/repositories/CinemaApiRepository";
import { Price } from "@/src/domain/CinemaApi";


export const addPrice = async (repository: CinemaApiRepository, entityId: number, cinemaApiId: number, price: Price): Promise<Price> => {
    const addedPrice = await repository.addPrice(entityId, cinemaApiId, price);
    return addedPrice;
}