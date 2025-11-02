import z from "zod";


export type Entity = {
    id: number;
    name : string;
};


export const EntityLogSchema = z.object({
    name: z.string().max(255),
})
