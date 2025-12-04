import { StorageItemRepository } from "@/src/application/repositories/Cinema/StorageItemRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { StorageItem } from "@/src/domain/Cinema/StorageItem";


export type PropsGetStorageItems = {
    page: number;
    movies?: number[];
    storage?: number[];
    rooms?: number[];
};

export const getStorageItems = (repo : StorageItemRepository, entityId: number, cinemaId: number, props: PropsGetStorageItems) : Promise<Paginator<StorageItem>> => {
    return repo.getStorageItems(entityId, cinemaId, props);
}