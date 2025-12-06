import z from "zod"
import { Entity } from "./Entity";
import { CustomError } from "./global";

export type UserLog = {
    email : string,
    password : string
}

export const UserLogSchema = z.object({
    email : z.email(),
    password : z.string().max(255),
})

export type Role = {
    id : number,
    name : string,
    cinemaId : number | null,
    entityId : number | null,
    rights?: string[]
};

export const RoleEmpty : Role = {
    id : 0,
    name : "",
    cinemaId : null,
    entityId : null,
    rights: []
};

export const RoleSchema = z.object({
    id : z.number(),
    name : z.string().max(100),
    cinemaId : z.number().nullable().optional(),
    entityId : z.number(),
    rights: z.array(z.string()).optional()
});

export type User = {
    id: number,
    email : string,
    firstname : string,
    lastname: string,
    phone : string | null,
    roles? : Role[],
    isSuperAdmin : boolean
    entities? : Entity[];
    rights? : string[];
}

export const UserEmpty : User = {
    id: 0,
    email : "",
    firstname : "",
    lastname: "",
    phone : null,
    roles : [],
    isSuperAdmin : false,
    entities: []
}

export const UserSchema = z.object({
    id: z.number(),
    email : z.string().email(),
    firstname : z.string().max(100),
    lastname: z.string().max(100),
    phone : z.string().max(20).nullable(),
    isSuperAdmin : z.boolean().nullable().default(false),
});

export const UserIsSuperAdmin = (user : User) : boolean => {
    return user.isSuperAdmin;
}

export const UserHaveAccessToEntity = (user : User, entityId : number) : boolean => {
    if (UserIsSuperAdmin(user)) {
        return true;
    }

    return user.entities?.some((entity) => entity.id === entityId) ?? false;
}

export const UserHaveAccessToCinema = (user : User, entityId : number, cinemaId : number) : boolean => {
    if (UserIsSuperAdmin(user)) {
        return true;
    }

    const entity = user.entities?.find((entity) => entity.id === entityId);
    if (!entity) {
        return false;
    }

    return entity.cinemas?.some((cinema) => cinema.id === cinemaId) ?? false;
}

export const UserHasRight = (user : User, rightName : string, cinemaId : number | null) : boolean => {
    if (UserIsSuperAdmin(user)) {
        return true;
    }

    if (cinemaId === null) {
        return user.rights?.includes(rightName) ?? false;
    }

    const rolesWithCinema = user.roles?.filter((role) => role.cinemaId === cinemaId) || [];
    for (const role of rolesWithCinema) {
        if (role.rights?.includes(rightName)) {
            return true;
        }
    }

    return false;
}

export const UserHasOneRight = (user : User, rightNames : string[], cinemaId : number | null) : boolean => {
    for (const rightName of rightNames) {
        if (UserHasRight(user, rightName, cinemaId)) {
            return true;
        }
    }
    return false;
}

export class Unauthenticated extends Error
{
    constructor()
    {
        super("L'utilisateur n'est pas authentifier");
    }
}

export class Unauthorized extends CustomError
{
    constructor(message?: string)
    {
        const baseMessage = "L'utilisateur n'est pas autorisé";
        super(message || baseMessage);
    }
}