import { SuperadminRepository } from "@/src/application/repositories/SuperadminRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { fetchSuperadminProps, Superadmin } from "@/src/domain/superadmin";
import { Unauthenticated, Unauthorized } from "@/src/domain/User";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const SuperadminRepositoryImpl: SuperadminRepository = {
    fetchAdmins: async (props : fetchSuperadminProps) : Promise<Paginator<Superadmin>> => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/superadmin/superadmin`, props, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Paginator<Superadmin>;
    },
    addSuperadmin: async (superadmin: Superadmin): Promise<Superadmin> => {
        let resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/superadmin/superadmin`, superadmin, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Superadmin;
    },
    updateSuperadmin: async (superadmin: Superadmin): Promise<Superadmin> => {
        let resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/superadmin/superadmin/${superadmin.id}`, superadmin, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Superadmin;
    },
    deleteSuperadmin: async (superadminId: number): Promise<void> => {
        await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/superadmin/superadmin/${superadminId}`, {}, {});
    }
}