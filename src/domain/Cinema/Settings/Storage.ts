import z from "zod";
import { StorageType } from "./StorageType";


export interface Storage {
    id: number;
    name: string;
    capacity: number;
    storage_type_id?: number;
    type?: StorageType;
}

export const StorageEmpty: Storage = {
    id: 0,
    name: "",
    capacity: 0,
};

export const StorageSchema = z.object({
    id: z.number().min(0),
    name: z.string().min(2).max(100),
    capacity: z.number().min(0),
    storage_type_id: z.number(),
});