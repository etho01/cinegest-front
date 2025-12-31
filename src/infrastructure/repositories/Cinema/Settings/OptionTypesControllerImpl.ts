import { OptionTypesRepository } from "@/src/application/repositories/Cinema/Settings/OptionTypesRepository";
import { getOptionsTypesProps } from "@/src/application/useCases/Cinema/Settings/OptionTypes/getOptionsTypes";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { OptionType } from "@/src/domain/Cinema/Settings/OptionTypes";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { buildApiUrl } from "@/src/lib/config/api";


export const OptionTypesRepositoryImpl : OptionTypesRepository = {
    getOptionsTypes: async (entityId: number, cinemaId: number, props: getOptionsTypesProps) : Promise<Paginator<OptionType>> => {
        return ApiRequestServeur.getAndParse<Paginator<OptionType>>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/option-types`),
            props
        );
    },
    deleteOptionType: async (entityId: number, cinemaId: number, optionTypeId: number) : Promise<boolean> => {
        await ApiRequestServeur.deleteRequest(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/option-types/${optionTypeId}`)
        );
        return true;
    },
    addOptionType: async (entityId: number, cinemaId: number, optionType: OptionType) : Promise<OptionType> => {
        return ApiRequestServeur.postAndParse<OptionType>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/option-types`),
            optionType
        );
    },
    updateOptionType: async (entityId: number, cinemaId: number, optionType: OptionType) : Promise<OptionType> => {
        return ApiRequestServeur.putAndParse<OptionType>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/option-types/${optionType.id}`),
            optionType
        );
    },
    getAllOptionsTypes: async (entityId: number, cinemaId: number) : Promise<OptionType[]> => {
        return ApiRequestServeur.getAndParse<OptionType[]>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/option-types/all`)
        );
    },
};