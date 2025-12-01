import { Option } from "./Settings/Option";
import z from "zod";

export type MovieVersion = {
    id: number;
    movieId: number;
    versionName: string;
    size: number;
    options : Option[];
}

export const MovieVersionEmpty: MovieVersion = {
    id: 0,
    movieId: 0,
    versionName: "",
    size: 0,
    options: [],
};

export const MovieVersionSchema = z.object({
    id: z.number().min(0),
    movieId: z.number().min(0),
    versionName: z.string().min(1).max(100),
    options: z.array(z.any()),
    size: z.number().min(0),
});

export type Movie = {
    id: number;
    externalId: number;
    title: string;
    description: string;
    durationMinutes: number;
    releaseDate: string;
    status?: number;
    sizeGB?: number;
    versions: MovieVersion[];
};

export const MovieEmpty: Movie = {
    id: 0,
    externalId: 0,
    title: "",
    description: "",
    durationMinutes: 0,
    releaseDate: "",
    status: 1,
    sizeGB: 0,
    versions: [],
};

export const MovieSchema = z.object({
    id: z.number().min(0),
    externalId: z.number().min(0),
    title: z.string().min(1).max(200),
    description: z.string().min(0).max(2000),
    durationMinutes: z.number().min(0),
    releaseDate: z.string(),
    sizeGB: z.number().min(0).optional(),
    versions: z.array(MovieVersionSchema),
});

export type MovieSearchResult = {
    id: number;
    title: string;
    release_date: string;
    overview: string;
}