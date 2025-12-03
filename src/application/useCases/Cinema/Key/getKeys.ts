import { KeyRepository } from "@/src/application/repositories/Cinema/KeyRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Key } from "@/src/domain/Cinema/Key";

export type PropsGetKeys = {
    page : number;
};

export const getKeys = async (repo : KeyRepository, entityId: number, cinemaId: number, props: PropsGetKeys) : Promise<Paginator<Key>> => {
    return await repo.getKeys(entityId, cinemaId, props);
}