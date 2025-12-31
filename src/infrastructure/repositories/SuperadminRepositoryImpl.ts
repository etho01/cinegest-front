import { SuperadminRepository } from "@/src/application/repositories/SuperadminRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { fetchSuperadminProps, Superadmin } from "@/src/domain/superadmin";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { buildApiUrl } from "@/src/lib/config/api";


export const SuperadminRepositoryImpl: SuperadminRepository = {
    fetchAdmins: async (props : fetchSuperadminProps) : Promise<Paginator<Superadmin>> => {
        return ApiRequestServeur.getAndParse<Paginator<Superadmin>>(
            buildApiUrl('api/app/superadmin/superadmin'),
            props
        );
    },
    addSuperadmin: async (superadmin: Superadmin): Promise<Superadmin> => {
        return ApiRequestServeur.postAndParse<Superadmin>(
            buildApiUrl('api/app/superadmin/superadmin'),
            superadmin
        );
    },
    updateSuperadmin: async (superadmin: Superadmin): Promise<Superadmin> => {
        return ApiRequestServeur.putAndParse<Superadmin>(
            buildApiUrl(`api/app/superadmin/superadmin/${superadmin.id}`),
            superadmin
        );
    },
    deleteSuperadmin: async (superadminId: number): Promise<void> => {
        return ApiRequestServeur.deleteRequest(
            buildApiUrl(`api/app/superadmin/superadmin/${superadminId}`)
        );
    }
}