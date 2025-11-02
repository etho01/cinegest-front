import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Entity } from "@/src/domain/Entity";
import { PropsFetchEntities } from "../useCases/Entity/fetchEntities";


export interface EntityRepository {
    fetchEntities: (props: PropsFetchEntities) => Promise<Paginator<Entity>>;
}