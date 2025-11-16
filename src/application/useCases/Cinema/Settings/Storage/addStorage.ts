import { StorageRepository } from "@/src/application/repositories/Cinema/Settings/StorageRepository";
import { Storage } from "@/src/domain/Cinema/Settings/Storage";


export const addStorage = async (repository: StorageRepository, entityId: number, cinemaId: number, data: Storage) => {
    return await repository.addStorage(entityId, cinemaId, data);
}