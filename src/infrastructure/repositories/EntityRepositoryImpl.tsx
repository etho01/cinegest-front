import { EntityRepository } from "@/src/application/repositories/EntityRepository";
import { PropsFetchEntities } from "@/src/application/useCases/Entity/fetchEntities";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Entity } from "@/src/domain/Entity";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const EntityRepositoryImpl: EntityRepository = {
    fetchEntities : async (props: PropsFetchEntities) : Promise<Paginator<Entity>> => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/superadmin/entity`, props, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Paginator<Entity>;
    },
    addEntity: async (entity: Entity) : Promise<Entity> => {    
        let resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/superadmin/entity`, entity, {});
        await throwErrorResponse(resp);
        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Entity;
    },
    updateEntity: async (entity: Entity) : Promise<Entity> => {    
        let resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/superadmin/entity/${entity.id}`, entity, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Entity;
    },
    delete: async (entityId: number) : Promise<void> => {    
        await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/superadmin/entity/${entityId}`, {}, {});
    }
};