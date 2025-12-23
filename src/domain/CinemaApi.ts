import z from "zod";
import { Cinema } from "./Cinema";

export type Price = {
    id: number;
    name: string;
    amount: number;
    currency: string;
    description?: string;
};

export const PriceEmpty : Price = {
    id: 0,
    name: "",
    amount: 0,
    currency: "EUR",
    description: "",
}

export const PriceSchema = z.object({
    id: z.number().min(0),
    name: z.string({message: "Le nom est requis"}).max(255),
    amount: z.number({message: "Le montant doit être un nombre"}).min(0, {message: "Le montant doit être au moins 0"}),
    currency: z.string({message: "La devise est requise"}).max(10),
    description: z.string().optional(),
});

export type CinemaApi = {
    id: number;
    name: string;
    apiKey: string;
    cinemas?: Cinema[];
    cinemaIds?: number[];
    prices?: Price[];
};

export const CinemaApiEmpty : CinemaApi = {
    id: 0,
    name: "",
    apiKey: "",
    cinemas: [],
    cinemaIds: [],
}

export const CinemaApiSchema = z.object({
    id: z.number().min(0),
    name: z.string({message: "Le nom est requis"}).max(255),
    cinemaIds: z.array(z.number(), {message: "Au moins un cinéma doit être sélectionné"}),
})