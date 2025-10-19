import z from "zod"

export type UserLog = {
    email : string,
    password : string
}

export const UserLogSchema = z.object({
    email : z.string().max(255),
    password : z.string().max(255),
})