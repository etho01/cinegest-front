import { StorageRepository } from "@/src/application/repositories/Cinema/Settings/StorageRepository";


export const deleteStorage = async (repository: StorageRepository, entityId: number, cinemaId: number, storageId: number) => {
    return await repository.deleteStorage(entityId, cinemaId, storageId);
};