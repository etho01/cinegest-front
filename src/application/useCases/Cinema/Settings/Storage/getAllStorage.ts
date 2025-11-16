import { StorageRepository } from "@/src/application/repositories/Cinema/Settings/StorageRepository";


export const getAllStorages = async (repository: StorageRepository, entityId: number, cinemaId: number) => {
    return await repository.getAllStorages(entityId, cinemaId);
}