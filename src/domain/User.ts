import z from "zod"

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
    roles : Role[],
    isSuperAdmin : boolean
}

export const UserIsSuperAdmin = (user : User) : boolean => {
    return user.isSuperAdmin;
}

export const UserHasRole = (user : User, roleName : string, cinemaId : number | null) : boolean => {
    return user.roles.some((role) => role.name === roleName && role.cinemaId === cinemaId);
}

export class Unauthenticated extends Error
{
    constructor()
    {
        super("L'utilisateur n'est pas authentifier");
    }
}