import { Movie, MovieVersion } from "./Movie";
import { Room } from "./Settings/Room";


export type Session = {
    id: number;
    movieVersionId: number;
    roomId: number;
    cinemaId: number;
    startTime: string;
    endTime: string;
    status: string;
    movieVersion?: MovieVersion;
    movie?: Movie;
    room?: Room;
    statusKey?: string;
    statusServer?: string;

};

export const SessionStatus = {

};

export const sessionEmpty: Session = {
    id: 0,
    movieVersionId: 0,
    roomId: 0,
    cinemaId: 0,
    startTime: '',
    endTime: '',
    status: '',
};