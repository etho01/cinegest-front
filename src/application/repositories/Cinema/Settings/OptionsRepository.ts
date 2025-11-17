import { getOptionsProps } from "@/src/application/useCases/Cinema/Settings/Option/getOptions";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Option } from "@/src/domain/Cinema/Settings/Option";


export interface OptionsRepository {
    getOptions(entityId: number, cinemaId: number, props: getOptionsProps): Promise<Paginator<Option>>;
    deleteOption(entityId: number, cinemaId: number, optionId: number): Promise<void>;
    addOption(entityId: number, cinemaId: number, option: Option): Promise<Option>;
    updateOption(entityId: number, cinemaId: number, option: Option): Promise<Option>;
    getAllOptions(entityId: number, cinemaId: number): Promise<Option[]>;
}