import { OptionTypesRepository } from "@/src/application/repositories/Cinema/Settings/OptionTypesRepository";


export const deleteOptionsType = async (repo : OptionTypesRepository, entityId: number, cinemaId: number, optionTypeId: number) => {
    return await repo.deleteOptionType(entityId, cinemaId, optionTypeId);
}