import { OptionsRepository } from "@/src/application/repositories/Cinema/Settings/OptionsRepository";


export const deleteOption = async (repo : OptionsRepository, entityId: number, cinemaId: number, optionId: number) => {
    return repo.deleteOption(entityId, cinemaId, optionId);
}