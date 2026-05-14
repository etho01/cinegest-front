import { StorageTypeRepository } from "@/src/application/repositories/Cinema/Settings/StorageTypeRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { StorageType } from "@/src/domain/Cinema/Settings/StorageType";

export type getOptionsProps = {
    search?: string;
    page : number;
}

export const getStorageTypes = async (repo : StorageTypeRepository, entityId: number, cinemaId: number, props: getOptionsProps) : Promise<Paginator<StorageType>> => {
    return await repo.getStorageTypes(entityId, cinemaId, props);
}