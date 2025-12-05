import { StorageItemRepository } from "@/src/application/repositories/Cinema/StorageItemRepository";

export const deleteStorageItem = async (repo : StorageItemRepository, entityId: number, cinemaId: number, storageItemId: number) => {
    return await repo.deleteStorageItem(entityId, cinemaId, storageItemId);
}