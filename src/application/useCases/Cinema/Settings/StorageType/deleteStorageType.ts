import { StorageTypeRepository } from "@/src/application/repositories/Cinema/Settings/StorageTypeRepository";


export const deleteStorageType = async (repository: StorageTypeRepository, entityId: number, cinemaId: number, storageTypeId: number) => {
    return await repository.deleteStorageType(entityId, cinemaId, storageTypeId);
}