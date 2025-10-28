import z from "zod"

export type UserLog = {
    email : string,
    password : string
}

export const UserLogSchema = z.object({
    email : z.email(),
    password : z.string().max(255),
})

export type User = {
    id: Number,
    email : string,
    firstname : string,
    lastname: string,
    phone : string | null
}

export class Unauthenticated extends Error
{
    constructor()
    {
        super("L'utilisateur n'est pas authentifier");
    }
}