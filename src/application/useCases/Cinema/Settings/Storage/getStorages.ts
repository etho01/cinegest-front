import { StorageRepository } from "@/src/application/repositories/Cinema/Settings/StorageRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Storage } from "@/src/domain/Cinema/Settings/Storage";

export interface GetStoragesProps {
    page?: number;
    search?: string;
    storageTypes ?: number[];
}

export const getStorages = async (repo : StorageRepository, entityId: number, cinemaId: number, props: GetStoragesProps) : Promise<Paginator<Storage>> => {
    return await repo.getStorages(entityId, cinemaId, props);
}