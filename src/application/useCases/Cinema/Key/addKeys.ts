import { KeyRepository } from "@/src/application/repositories/Cinema/KeyRepository";
import { MovieVersion } from "@/src/domain/Cinema/Movie";
import { Room } from "@/src/domain/Cinema/Settings/Room";

export interface AddKeyModalElement {
    dateStart: Date | null;
    dateEnd: Date | null;
    cinemaId: number;
    versions: {movieVersionId : number  | null, rooms: number[]}[];
}

export const addKeys = async (repo : KeyRepository, entityId: number, cinemaId: number, keys : AddKeyModalElement) : Promise<void> => {
    await repo.addKeys(entityId, cinemaId, keys);
}