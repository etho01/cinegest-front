import { RoleRepository } from "@/src/application/repositories/RoleRepository";
import { PropsFetchEntities } from "@/src/application/useCases/Role/getRoles";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Role } from "@/src/domain/User";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const RoleRepositoryImpl: RoleRepository = {
    getRoles: async (entityId: number, props: PropsFetchEntities): Promise<Paginator<Role>> => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/roles`, props, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Paginator<Role>;
    },
    getRole : async (entityId: number, roleId: number): Promise<Role> => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/roles/${roleId}`, {}, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Role;
    },
    addRole: async (entityId: number, role: Role): Promise<Role> => {
        let resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/roles`, role, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Role;
    },
    updateRole: async (entityId: number, role: Role): Promise<Role> => {
        let resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/entity/${entityId}/roles/${role.id}`, role, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Role;
    },
    deleteRole: async (entityId: number, roleId: number): Promise<void> => {
        let resp = await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/roles/${roleId}`, {}, {});
        await throwErrorResponse(resp);
    }
}