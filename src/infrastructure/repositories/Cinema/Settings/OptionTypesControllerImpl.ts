import { OptionTypesRepository } from "@/src/application/repositories/Cinema/Settings/OptionTypesRepository";
import { getOptionsTypesProps } from "@/src/application/useCases/Cinema/Settings/OptionTypes/getOptionsTypes";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { OptionType } from "@/src/domain/Cinema/Settings/OptionTypes";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const OptionTypesRepositoryImpl : OptionTypesRepository = {
    getOptionsTypes: async (entityId: number, cinemaId: number, props: getOptionsTypesProps) : Promise<Paginator<OptionType>> => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/option-types`, props, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Paginator<OptionType>;
    },
    deleteOptionType: async (entityId: number, cinemaId: number, optionTypeId: number) : Promise<boolean> => {
        let resp = await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/option-types/${optionTypeId}`, {}, {});
        await throwErrorResponse(resp);

        return true;
    },
    addOptionType: async (entityId: number, cinemaId: number, optionType: OptionType) : Promise<OptionType> => {
        let resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/option-types`, optionType, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as OptionType;
    },
    updateOptionType: async (entityId: number, cinemaId: number, optionType: OptionType) : Promise<OptionType> => {
        let resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/option-types/${optionType.id}`, optionType, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as OptionType;
    },
    getAllOptionsTypes: async (entityId: number, cinemaId: number) : Promise<OptionType[]> => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/option-types/all`, {}, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as OptionType[];
    },
};