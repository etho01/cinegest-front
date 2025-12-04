import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { PropsGetStorageItems } from "../../useCases/Cinema/StorageItem/getStorageItems";
import { StorageItem } from "@/src/domain/Cinema/StorageItem";


export interface StorageItemRepository {
    getStorageItems(entityId: number, cinemaId: number, props: PropsGetStorageItems): Promise<Paginator<StorageItem>>;
};