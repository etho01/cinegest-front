import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { PropsGetStorageItems } from "../../useCases/Cinema/StorageItem/getStorageItems";
import { StorageItem } from "@/src/domain/Cinema/StorageItem";
import { addStorageItemObjectParams } from "../../useCases/Cinema/StorageItem/addStorageItems";


export interface StorageItemRepository {
    getStorageItems(entityId: number, cinemaId: number, props: PropsGetStorageItems): Promise<Paginator<StorageItem>>;
    addStorageItems(entityId: number, cinemaId: number, params: addStorageItemObjectParams): Promise<StorageItem>;
    deleteStorageItem(entityId: number, cinemaId: number, storageItemId: number): Promise<void>;
};