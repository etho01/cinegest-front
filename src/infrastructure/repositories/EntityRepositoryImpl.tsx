import { EntityRepository } from "@/src/application/repositories/EntityRepository";
import { PropsFetchEntities } from "@/src/application/useCases/Entity/fetchEntities";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Entity } from "@/src/domain/Entity";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";


export const EntityRepositoryImpl: EntityRepository = {
    fetchEntities : async (props: PropsFetchEntities) : Promise<Paginator<Entity>> => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/superAdmin/entity`, props, {});

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Paginator<Entity>;
    }
}