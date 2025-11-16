import z from "zod";
import { OptionType } from "./OptionTypes";

export interface Option {
    id: number;
    name: string;
    type? : OptionType;
    option_type_id? : number;
}

export const OptionSchema = z.object({
    id: z.number().min(0),
    name: z.string().min(2).max(100),
    option_type_id: z.number(),
});

export const OptionEmpty: Option = {
    id: 0,
    name: "",
    option_type_id: 0,
};