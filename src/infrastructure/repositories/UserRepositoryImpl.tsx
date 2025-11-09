import { UserRepository } from "@/src/application/repositories/UserRepository";
import { getUsersParams } from "@/src/application/useCases/User/getUsers";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Unauthenticated, Unauthorized, User, UserLog } from "@/src/domain/User";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";
import fsPromises from 'fs/promises';


export const UserRepositoryImpl: UserRepository = {
    connect: async (userLog: UserLog) => {
        let resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/auth/login`, userLog, {});

        let text = await resp.text()
        let body = JSON.parse(text);
        return body['token'];
    },
    logout: async () => {
        await ApiRequestServeur.POST(`${process.env.API_URL}api/app/auth/logout`, {}, {});
    },
    me: async (): Promise<User> => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/me`, {}, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);

        let roles = body['roles'].map((roleData: any) => {
            return {
                id: roleData['id'],
                name: roleData['name'],
                cinemaId: roleData['pivot']['cinema_id'],
                entityId: roleData['entity_id']
            }
        });

        let entities = body['entities'].map((entityData: any) => {
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
        }
    },
    getUsers : async (entityId : number, params: getUsersParams) : Promise<Paginator<User>> => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/users`, params, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Paginator<User>;
    },
    getUser : async (entityId : number, userId : number) : Promise<User | null> => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/users/${userId}`, {}, {});
        if (resp.status === 404) {
            return null;
        }
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as User;
    },
    addUser : async (entityId : number, user : User) : Promise<User> => {
        let resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/users`, user, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as User;
    },
    updateUser : async (entityId : number, user : User) : Promise<User> => {
        let resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/entity/${entityId}/users/${user.id}`, user, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as User;
    },
    deleteUser : async (entityId : number, userId : number) : Promise<void> => {
        await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/users/${userId}`, {}, {});
    }
}