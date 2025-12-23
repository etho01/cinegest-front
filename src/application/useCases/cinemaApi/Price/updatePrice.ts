import { CinemaApiRepository } from "@/src/application/repositories/CinemaApiRepository";
import { Price } from "@/src/domain/CinemaApi";


export const updatePrice = async (repository: CinemaApiRepository, entityId: number, cinemaApiId: number, price: Price): Promise<Price> => {
    const updatedPrice = await repository.updatePrice(entityId, cinemaApiId, price);
    return updatedPrice;
}