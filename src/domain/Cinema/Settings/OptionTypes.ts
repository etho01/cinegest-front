import z from "zod";

export interface OptionType {
    id: number;
    name: string;
    description?: string | null;
}

export const OptionTypeSchema = z.object({
    id: z.number().min(0),
    name: z.string().min(2).max(100),
    description: z.string().max(500).optional().nullable(),
});

export const OptionTypeEmpty: OptionType = {
    id: 0,
    name: "",
    description: "",
};