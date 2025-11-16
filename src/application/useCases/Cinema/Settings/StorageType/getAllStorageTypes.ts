import { StorageTypeRepository } from "@/src/application/repositories/Cinema/Settings/StorageTypeRepository";


export const getAllStorageTypes = async (repo: StorageTypeRepository, entityId: number, cinemaId: number) => {
    return await repo.getAllStorageTypes(entityId, cinemaId);
}