import { OptionsRepository } from "@/src/application/repositories/Cinema/Settings/OptionsRepository";
import { getOptionsProps } from "@/src/application/useCases/Cinema/Settings/Option/getOptions";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Option } from "@/src/domain/Cinema/Settings/Option";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { buildApiUrl } from "@/src/lib/config/api";


export const OptionsRepositoryImpl : OptionsRepository = {
    getOptions: async (entityId: number, cinemaId: number, props: getOptionsProps) : Promise<Paginator<Option>> => {
        return ApiRequestServeur.getAndParse<Paginator<Option>>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/options`),
            props
        );
    },
    deleteOption: async (entityId: number, cinemaId: number, optionId: number): Promise<void> => {
        return ApiRequestServeur.deleteRequest(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/options/${optionId}`)
        );
    },
    addOption: async (entityId: number, cinemaId: number, option: Option): Promise<Option> => {
        return ApiRequestServeur.postAndParse<Option>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/options`),
            option
        );
    },
    updateOption: async (entityId: number, cinemaId: number, option: Option): Promise<Option> => {
        return ApiRequestServeur.putAndParse<Option>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/options/${option.id}`),
            option
        );
    },
    getAllOptions:  async (entityId: number, cinemaId: number): Promise<Option[]> => {
        return ApiRequestServeur.getAndParse<Option[]>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/options/all`)
        );
    }
}