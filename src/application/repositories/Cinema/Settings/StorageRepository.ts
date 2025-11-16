import { GetStoragesProps } from "@/src/application/useCases/Cinema/Settings/Storage/getStorages";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Storage } from "@/src/domain/Cinema/Settings/Storage";


export interface StorageRepository {
    getStorages(entityId: number, cinemaId: number, props: GetStoragesProps): Promise<Paginator<Storage>>;
    deleteStorage(entityId: number, cinemaId: number, storageId: number): Promise<void>;
    addStorage(entityId: number, cinemaId: number, data: Storage): Promise<Storage>;
    updateStorage(entityId: number, cinemaId: number, data: Storage): Promise<Storage>;
    getAllStorages(entityId: number, cinemaId: number): Promise<Storage[]>;
}