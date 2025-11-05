import z from "zod";
import { Cinema } from "./Cinema";


export type Entity = {
    id: number;
    name : string;
    cinemas? : Cinema[];
};

export const EntityEmpty : Entity = {
    id: 0,
    name: "",
    cinemas: []
}

export const EntitySchema = z.object({
    id: z.number().min(0),
    name: z.string().max(255),
})
