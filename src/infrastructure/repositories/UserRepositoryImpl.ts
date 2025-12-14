import { UserRepository } from "@/src/application/repositories/UserRepository";
import { getUsersParams } from "@/src/application/useCases/User/getUsers";
import { UpdateMePasswordProps } from "@/src/application/useCases/User/updateMePassword";
import { rolesCinemaListType } from "@/src/application/useCases/User/updateUserRole";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { User, UserLog, PasswordResetRequest, PasswordReset } from "@/src/domain/User";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const UserRepositoryImpl: UserRepository = {
    connect: async (userLog: UserLog) => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/auth/login`, userLog, {});
        await throwErrorResponse(resp);

        const text = await resp.text()
        const body = JSON.parse(text);
        return body['token'];
    },
    logout: async () => {
        await ApiRequestServeur.POST(`${process.env.API_URL}api/app/auth/logout`, {}, {});
    },
    me: async (): Promise<User> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/me`, {}, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        const roles = body['roles'].map((roleData: any) => {
            return {
                id: roleData['id'],
                name: roleData['name'],
                cinemaId: roleData['pivot']['cinema_id'],
                entityId: roleData['pivot']['entity_id'],
                rights: roleData['rights'] || []
            }
        });

        const entities = body['entities'].map((entityData: any) => {
            return {
                id: entityData['id'],
                name: entityData['name'],
                cinemas: entityData['cinemas']
            }
        });

        return {
            id: body['id'],
            email: body['email'],
            firstname: body['firstname'],
            lastname: body['lastname'],
            phone: body['phone'],
            roles: roles,
            isSuperAdmin: body['isSuperAdmin'],
            entities: entities,
            rights: body['rights'] || []
        }
    },
    getUsers : async (entityId : number, params: getUsersParams) : Promise<Paginator<User>> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/users`, params, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as Paginator<User>;
    },
    getUser : async (entityId : number, userId : number) : Promise<User | null> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/users/${userId}`, {}, {});
        if (resp.status === 404) {
            return null;
        }
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as User;
    },
    addUser : async (entityId : number, user : User) : Promise<User> => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/users`, user, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as User;
    },
    updateUser : async (entityId : number, user : User) : Promise<User> => {
        const resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/entity/${entityId}/users/${user.id}`, user, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as User;
    },
    deleteUser : async (entityId : number, userId : number) : Promise<void> => {
        await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/users/${userId}`, {}, {});
    },
    updateUserRoles : async (entityId: number, userId: number, rolesUser: rolesCinemaListType[]) => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/users/${userId}/roles`, { rolesUser }, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as User;
    },
    updateUserRights : async (entityId: number, userId: number, rights: string[]) => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/users/${userId}/rights`, { rights }, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as User;
    },
    updateMe : async (user : User) : Promise<User> => {
        const resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/me`, user, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        return body as User;
    },
    updateMePassword : async (props: UpdateMePasswordProps) : Promise<void> => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/me/password`, props, {});
        await throwErrorResponse(resp);
    },
    requestPasswordReset : async (request: PasswordResetRequest) : Promise<void> => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/auth/forgot-password`, request, {});
        await throwErrorResponse(resp);
    },
    resetPassword : async (reset: PasswordReset) : Promise<void> => {
        const resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/auth/reset-password`, reset, {});
        await throwErrorResponse(resp);
    },
}