import { UserRepository } from "@/src/application/repositories/UserRepository";
import { getUsersParams } from "@/src/application/useCases/User/getUsers";
import { UpdateMePasswordProps } from "@/src/application/useCases/User/updateMePassword";
import { rolesCinemaListType } from "@/src/application/useCases/User/updateUserRole";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { User, UserLog, PasswordResetRequest, PasswordReset} from "@/src/domain/User";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { buildApiUrl } from "@/src/lib/config/api";
import { throwErrorResponse } from "@/src/lib/request/Request";
import { Entity } from "@/src/domain/Entity";

interface RoleApi {
    id: number,
    name: string,
    pivot: {
        cinema_id: number | null,
        entity_id: number | null,
    },
    rights?: string[]
}

export const UserRepositoryImpl: UserRepository = {
    connect: async (userLog: UserLog) => {
        const body = await ApiRequestServeur.postAndParse<{ token: string }>(
            buildApiUrl('api/app/auth/login'),
            userLog
        );
        return body['token'];
    },
    logout: async () => {
        await ApiRequestServeur.POST(buildApiUrl('api/app/auth/logout'), {}, {});
    },
    me: async (): Promise<User> => {
        const resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/me`, {}, {});
        await throwErrorResponse(resp);

        const text = await resp.text();
        const body = JSON.parse(text);
        const roles = body['roles'].map((roleData: RoleApi) => {
            return {
                id: roleData['id'],
                name: roleData['name'],
                cinemaId: roleData['pivot']['cinema_id'],
                entityId: roleData['pivot']['entity_id'],
                rights: roleData['rights'] || []
            }
        });

        const entities = body['entities'].map((entityData: Entity) => {
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
        return ApiRequestServeur.getAndParse<Paginator<User>>(
            buildApiUrl(`api/app/entity/${entityId}/users`),
            params
        );
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
        return ApiRequestServeur.postAndParse<User>(
            buildApiUrl(`api/app/entity/${entityId}/users`),
            user
        );
    },
    updateUser : async (entityId : number, user : User) : Promise<User> => {
        return ApiRequestServeur.putAndParse<User>(
            buildApiUrl(`api/app/entity/${entityId}/users/${user.id}`),
            user
        );
    },
    deleteUser : async (entityId : number, userId : number) : Promise<void> => {
        await ApiRequestServeur.DELETE(buildApiUrl(`api/app/entity/${entityId}/users/${userId}`), {}, {});
    },
    updateUserRoles : async (entityId: number, userId: number, rolesUser: rolesCinemaListType[]) => {
        return ApiRequestServeur.postAndParse<User>(
            buildApiUrl(`api/app/entity/${entityId}/users/${userId}/roles`),
            { rolesUser }
        );
    },
    updateUserRights : async (entityId: number, userId: number, rights: string[]) => {
        return ApiRequestServeur.postAndParse<User>(
            buildApiUrl(`api/app/entity/${entityId}/users/${userId}/rights`),
            { rights }
        );
    },
    updateMe : async (user : User) : Promise<User> => {
        return ApiRequestServeur.putAndParse<User>(
            buildApiUrl('api/app/me'),
            user
        );
    },
    updateMePassword : async (props: UpdateMePasswordProps) : Promise<void> => {
        const resp = await ApiRequestServeur.POST(buildApiUrl('api/app/me/password'), props, {});
        await throwErrorResponse(resp);
    },
    requestPasswordReset : async (request: PasswordResetRequest) : Promise<void> => {
        const resp = await ApiRequestServeur.POST(buildApiUrl('api/app/auth/forgot-password'), request, {});
        await throwErrorResponse(resp);
    },
    resetPassword : async (reset: PasswordReset) : Promise<void> => {
        const resp = await ApiRequestServeur.POST(buildApiUrl('api/app/auth/reset-password'), reset, {});
        await throwErrorResponse(resp);
    },
}