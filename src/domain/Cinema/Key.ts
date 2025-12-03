import z from "zod";
import { MovieVersion } from "./Movie";
import { Room } from "./Settings/Room";


export type Key = {
    id: number;
    cinemaId: number;
    roomId : number;
    movieVersionId : number;
    dateStart : string;
    dateEnd : string;
    room?: Room;
    movieVersion?: MovieVersion;
}

export const KeyEmpty: Key = {
    id: 0,
    cinemaId: 0,
    roomId: 0,
    movieVersionId: 0,
    dateStart: "",
    dateEnd: "",
};

export const KeySchema = z.object({
    id: z.number().min(0),
    cinemaId: z.number().min(0),
    roomId: z.number().min(0),
    movieVersionId: z.number().min(0),
    dateStart: z.date(),
    dateEnd: z.date(),
});