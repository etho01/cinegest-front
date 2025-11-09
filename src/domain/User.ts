import z from "zod"
import { Entity } from "./Entity";

export type UserLog = {
    email : string,
    password : string
}

export const UserLogSchema = z.object({
    email : z.email(),
    password : z.string().max(255),
})

export type Role = {
    id : Number,
    name : string,
    cinemaId : Number | null,
    entityId : Number | null
};

export type User = {
    id: Number,
    email : string,
    firstname : string,
    lastname: string,
    phone : string | null,
    roles? : Role[],
    isSuperAdmin : boolean
    entities? : Entity[];
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

export const UserHasRole = (user : User, roleName : string, cinemaId : number | null) : boolean => {
    return user?.roles?.some((role) => role.name === roleName && role.cinemaId === cinemaId) ?? false;
}

export class Unauthenticated extends Error
{
    constructor()
    {
        super("L'utilisateur n'est pas authentifier");
    }
}

export class Unauthorized extends Error
{
    constructor(message?: string)
    {
        let baseMessage = "L'utilisateur n'est pas autorisé";
        super(message || baseMessage);
    }
}