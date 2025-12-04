
import { Key } from "@/src/domain/Cinema/Key";
import { PropsGetKeys } from "../../useCases/Cinema/Key/getKeys";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { AddKeyModalElement } from "../../useCases/Cinema/Key/addKeys";


export interface KeyRepository {
    getKeys(entityId: number, cinemaId: number, props: PropsGetKeys): Promise<Paginator<Key>>;
    addKeys(entityId: number, cinemaId: number, keys: AddKeyModalElement): Promise<void>;
    deleteKey(entityId: number, cinemaId: number, keyId: number): Promise<void>;
}