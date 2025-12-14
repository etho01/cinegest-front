import z from "zod";
import { Cinema } from "./Cinema";


export type CinemaApi = {
    id: number;
    name: string;
    apiKey: string;
    cinemas?: Cinema[];
    cinemaIds?: number[];
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