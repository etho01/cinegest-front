
import { Key } from "@/src/domain/Cinema/Key";
import { PropsGetKeys } from "../../useCases/Cinema/Key/getKeys";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";


export interface KeyRepository {
    getKeys(entityId: number, cinemaId: number, props: PropsGetKeys): Promise<Paginator<Key>>;
}