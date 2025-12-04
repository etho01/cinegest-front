import z from "zod";
import { Option } from "./Option";


export interface Room {
    id: number;
    name: string;
    capacity: number;
    options: Option[];
    storages: Storage[];
    optionsIds?: number[];
    storagesIds?: number[];
    serveurSize?: number;
}

export const RoomSchema = z.object({
    id: z.number().min(0),
    name: z.string().min(2).max(100),
    capacity: z.number().min(0),
    optionsIds: z.array(z.number().min(0)).optional(),
    storagesIds: z.array(z.number().min(0)).optional(),
    serveurSize: z.number().min(0),
});

export const RoomEmpty: Room = {
    id: 0,
    name: "",
    capacity: 0,
    options: [],
    storages: [],
    optionsIds: [],
    storagesIds: [],
    serveurSize: 0,
};