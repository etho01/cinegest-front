import { RoleRepository } from "@/src/application/repositories/RoleRepository";
import { PropsFetchEntities } from "@/src/application/useCases/Role/getRoles";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Role } from "@/src/domain/User";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const RoleRepositoryImpl: RoleRepository = {
    getRoles: async (entityId: number, props: PropsFetchEntities): Promise<Paginator<Role>> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/roles`, props, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Paginator<Role>;
    },
    getAllRoleByEntity: async (entityId: number): Promise<Role[]> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/roles/all`, {}, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Role[];
    },
    getRole : async (entityId: number, roleId: number): Promise<Role> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/roles/${roleId}`, {}, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Role;
    },
    addRole: async (entityId: number, role: Role): Promise<Role> => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/roles`, role, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Role;
    },
    updateRole: async (entityId: number, role: Role): Promise<Role> => {
        const resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/entity/${entityId}/roles/${role.id}`, role, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Role;
    },
    deleteRole: async (entityId: number, roleId: number): Promise<void> => {
        const resp = await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/roles/${roleId}`, {}, {});
        await throwErrorResponse(resp);
    }
}