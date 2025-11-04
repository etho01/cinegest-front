import z from "zod";


export type Entity = {
    id: number;
    name : string;
};

export const EntityEmpty : Entity = {
    id: 0,
    name: ""
}

export const EntitySchema = z.object({
    id: z.number().min(0),
    name: z.string().max(255),
})
