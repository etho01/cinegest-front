import z from "zod";


export interface StorageType {
    id: number;
    name: string;
}

export const StorageTypeSchema = z.object({
    id: z.number().min(0),
    name: z.string().min(2).max(100),
});

export const StorageTypeEmpty: StorageType = {
    id: 0,
    name: "",
};