import { OptionsRepository } from "@/src/application/repositories/Cinema/Settings/OptionsRepository";
import { Option } from "@/src/domain/Cinema/Settings/Option";


export const addOption = async (repository: OptionsRepository, entityId: number, cinemaId: number, option: Option) => {
    const newOption = await repository.addOption(entityId, cinemaId, option);
    return newOption;
}