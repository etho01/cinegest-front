import { OptionsRepository } from "@/src/application/repositories/Cinema/Settings/OptionsRepository";
import { getOptionsProps } from "@/src/application/useCases/Cinema/Settings/Option/getOptions";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Option } from "@/src/domain/Cinema/Settings/Option";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const OptionsRepositoryImpl : OptionsRepository = {
    getOptions: async (entityId: number, cinemaId: number, props: getOptionsProps) : Promise<Paginator<Option>> => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/options`, props, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Paginator<Option>;
    },
    deleteOption: async (entityId: number, cinemaId: number, optionId: number): Promise<void> => {
        let resp = await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/options/${optionId}`, {}, {});
        await throwErrorResponse(resp);
    },
    addOption: async (entityId: number, cinemaId: number, option: Option): Promise<Option> => {
        let resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/options`, option, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Option;
    },
    updateOption: async (entityId: number, cinemaId: number, option: Option): Promise<Option> => {
        let resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/options/${option.id}`, option, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Option;
    }
}