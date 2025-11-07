import z from "zod";
import { Entity } from "./Entity";

export type Cinema = {
    id: number;
    name: string;
    address: string;
    address_complement?: string;
    postal_code: string;
    city: string;
    country: string;
};

export const CinemaSchema = z.object({
    id: z.number().min(0),
    name: z.string().min(2).max(100),
    address: z.string().min(2).max(200),
    address_complement: z.string().max(200).optional(),
    postal_code: z.string().min(5).max(10),
    city: z.string().min(2).max(100),
    country: z.string().min(2).max(100),
});

export const CinemaEmpty: Cinema = {
    id: 0,
    name: "",
    address: "",
    address_complement: "",
    postal_code: "",
    city: "",
    country: "",
};