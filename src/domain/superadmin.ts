import z from "zod";

export type fetchSuperadminProps = {
    page: number;
    search?: string;
};

export type Superadmin = {
    id: Number,
    email : string,
    phone : string | null,
    firstname : string,
    lastname: string,
}

export const SuperadminSchema = z.object({
    id: z.number(),
    email : z.string().email(),
    phone : z.string().max(15).nullable(),
    firstname : z.string().min(2).max(100),
    lastname: z.string().min(2).max(100),
});