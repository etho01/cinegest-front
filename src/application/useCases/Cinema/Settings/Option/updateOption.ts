import { OptionsRepository } from "@/src/application/repositories/Cinema/Settings/OptionsRepository";
import { Option } from "@/src/domain/Cinema/Settings/Option";


export const updateOption = async (repository: OptionsRepository, entityId: number, cinemaId: number, option: Option) => {
    const updatedOption = await repository.updateOption(entityId, cinemaId, option);
    return updatedOption;
}