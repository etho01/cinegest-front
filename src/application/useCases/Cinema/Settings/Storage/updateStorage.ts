import { StorageRepository } from "@/src/application/repositories/Cinema/Settings/StorageRepository";
import { Storage } from "@/src/domain/Cinema/Settings/Storage";


export const updateStorage = async (repository: StorageRepository, entityId: number, cinemaId: number, data: Storage) => {
    return await repository.updateStorage(entityId, cinemaId, data);
}