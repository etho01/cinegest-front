import { RoleRepository } from "@/src/application/repositories/RoleRepository";
import { PropsFetchEntities } from "@/src/application/useCases/Role/getRoles";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Role } from "@/src/domain/User";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { buildApiUrl } from "@/src/lib/config/api";


export const RoleRepositoryImpl: RoleRepository = {
    getRoles: async (entityId: number, props: PropsFetchEntities): Promise<Paginator<Role>> => {
        return ApiRequestServeur.getAndParse<Paginator<Role>>(
            buildApiUrl(`api/app/entity/${entityId}/roles`),
            props
        );
    },
    getAllRoleByEntity: async (entityId: number): Promise<Role[]> => {
        return ApiRequestServeur.getAndParse<Role[]>(
            buildApiUrl(`api/app/entity/${entityId}/roles/all`)
        );
    },
    getRole : async (entityId: number, roleId: number): Promise<Role> => {
        return ApiRequestServeur.getAndParse<Role>(
            buildApiUrl(`api/app/entity/${entityId}/roles/${roleId}`)
        );
    },
    addRole: async (entityId: number, role: Role): Promise<Role> => {
        return ApiRequestServeur.postAndParse<Role>(
            buildApiUrl(`api/app/entity/${entityId}/roles`),
            role
        );
    },
    updateRole: async (entityId: number, role: Role): Promise<Role> => {
        return ApiRequestServeur.putAndParse<Role>(
            buildApiUrl(`api/app/entity/${entityId}/roles/${role.id}`),
            role
        );
    },
    deleteRole: async (entityId: number, roleId: number): Promise<void> => {
        return ApiRequestServeur.deleteRequest(
            buildApiUrl(`api/app/entity/${entityId}/roles/${roleId}`)
        );
    }
}