import { OptionTypesRepository } from "@/src/application/repositories/Cinema/Settings/OptionTypesRepository";
import { OptionType } from "@/src/domain/Cinema/Settings/OptionTypes";


export const updateOptionType = (repo : OptionTypesRepository, entityId : number, cinemaId : number, optionType : OptionType) => {
    return repo.updateOptionType(entityId, cinemaId, optionType);
};