import { StorageItemRepository } from "@/src/application/repositories/Cinema/StorageItemRepository";

export interface addStorageItemObjectParams {
    roomId?: number;
    storageId?: number;
    originId?: number;
    movieVersions : (number | null)[];
}


export const addStorageItems = async (repo : StorageItemRepository, entityId: number, cinemaId: number, params: addStorageItemObjectParams) => {
    return await repo.addStorageItems(entityId, cinemaId, params);
}