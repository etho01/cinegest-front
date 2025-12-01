import { OptionsRepository } from "@/src/application/repositories/Cinema/Settings/OptionsRepository";
import { getOptionsProps } from "@/src/application/useCases/Cinema/Settings/Option/getOptions";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Option } from "@/src/domain/Cinema/Settings/Option";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const OptionsRepositoryImpl : OptionsRepository = {
    getOptions: async (entityId: number, cinemaId: number, props: getOptionsProps) : Promise<Paginator<Option>> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/options`, props, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Paginator<Option>;
    },
    deleteOption: async (entityId: number, cinemaId: number, optionId: number): Promise<void> => {
        const resp = await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/options/${optionId}`, {}, {});
        await throwErrorResponse(resp);
    },
    addOption: async (entityId: number, cinemaId: number, option: Option): Promise<Option> => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/options`, option, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Option;
    },
    updateOption: async (entityId: number, cinemaId: number, option: Option): Promise<Option> => {
        const resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/options/${option.id}`, option, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Option;
    },
    getAllOptions:  async (entityId: number, cinemaId: number): Promise<Option[]> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/options/all`, {}, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Option[];
    }
}