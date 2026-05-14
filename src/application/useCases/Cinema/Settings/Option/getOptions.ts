import { OptionsRepository } from "@/src/application/repositories/Cinema/Settings/OptionsRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Option } from "@/src/domain/Cinema/Settings/Option";

export type getOptionsProps = {
    search?: string;
    page : number;
    optionTypes ?: number[];
}

export const getOptions = async (repo : OptionsRepository, entityId: number, cinemaId: number, props: getOptionsProps) : Promise<Paginator<Option>> => {
    return repo.getOptions(entityId, cinemaId, props);
}