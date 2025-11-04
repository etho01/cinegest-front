import { SuperadminRepository } from "@/src/application/repositories/superadminRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { fetchSuperadminProps, Superadmin } from "@/src/domain/superadmin";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";


export const SuperadminRepositoryImpl: SuperadminRepository = {
    fetchAdmins: async (props : fetchSuperadminProps) : Promise<Paginator<Superadmin>> => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/superadmin/superadmin`, props, {});

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Paginator<Superadmin>;
    }
}