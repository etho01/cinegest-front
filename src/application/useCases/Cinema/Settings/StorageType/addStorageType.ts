import { StorageTypeRepository } from "@/src/application/repositories/Cinema/Settings/StorageTypeRepository";
import { StorageType } from "@/src/domain/Cinema/Settings/StorageType";


export const addStorageType = async (repo: StorageTypeRepository, entityId: number, cinemaId: number, storageType: StorageType) => {
    return await repo.addStorageType(entityId, cinemaId, storageType);
};