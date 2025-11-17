import { OptionsRepository } from "@/src/application/repositories/Cinema/Settings/OptionsRepository";


export const getAllOptions  = async (repo : OptionsRepository, entityId: number, cinemaId: number) => {
    return await repo.getAllOptions(entityId, cinemaId);
};