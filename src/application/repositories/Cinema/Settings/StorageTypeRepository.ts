import { getOptionsProps } from "@/src/application/useCases/Cinema/Settings/Option/getOptions";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { StorageType } from "@/src/domain/Cinema/Settings/StorageType";


export interface StorageTypeRepository {
    deleteStorageType(entityId: number, cinemaId: number, storageTypeId: number): Promise<void>;
    getStorageTypes(entityId: number, cinemaId: number, props: getOptionsProps): Promise<Paginator<StorageType>>;
    addStorageType(entityId: number, cinemaId: number, storageType: StorageType): Promise<StorageType>;
    updateStorageType(entityId: number, cinemaId: number, storageType: StorageType): Promise<StorageType>;
    getAllStorageTypes(entityId: number, cinemaId: number): Promise<StorageType[]>;
}