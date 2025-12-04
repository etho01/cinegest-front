import { Movie, MovieVersion } from "./Movie";
import { Room } from "./Settings/Room";


export type StorageItem = {
    id: number;
    movieId: number;
    movieVersionId: number;
    roomId: number;
    storageId: number;
    originId: number;
    status: string;
    movieVersion?: MovieVersion;
    movie?: Movie;
    room?: Room;
    storage?: Storage;
    origin?: Storage;
};

export const StorageItemEmpty: StorageItem = {
    id: 0,
    movieId: 0,
    movieVersionId: 0,
    roomId: 0,
    storageId: 0,
    originId: 0,
    status: 'pending',
};

export const StorageItemStatus = {
    PENDING: 'pending',
    STORED: 'stored',
    ERROR: 'error',
};

