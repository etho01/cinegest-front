import { getOptionsTypesProps } from "@/src/application/useCases/Cinema/Settings/OptionTypes/getOptionsTypes";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { OptionType } from "@/src/domain/Cinema/Settings/OptionTypes";


export interface OptionTypesRepository {
    getOptionsTypes(entityId: number, cinemaId: number, props: getOptionsTypesProps): Promise<Paginator<OptionType>>;
    deleteOptionType(entityId: number, cinemaId: number, optionTypeId: number): Promise<boolean>;
    addOptionType(entityId: number, cinemaId: number, optionType: OptionType): Promise<OptionType>;
    updateOptionType(entityId: number, cinemaId: number, optionType: OptionType): Promise<OptionType>;
    getAllOptionsTypes(entityId: number, cinemaId: number): Promise<OptionType[]>;
}