import { EntityRepository } from "@/src/application/repositories/EntityRepository";
import { PropsFetchEntities } from "@/src/application/useCases/Entity/fetchEntities";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Entity } from "@/src/domain/Entity";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { buildApiUrl } from "@/src/lib/config/api";


export const EntityRepositoryImpl: EntityRepository = {
    fetchEntities : async (props: PropsFetchEntities) : Promise<Paginator<Entity>> => {
        return ApiRequestServeur.getAndParse<Paginator<Entity>>(
            buildApiUrl('api/app/superadmin/entity'),
            props
        );
    },
    addEntity: async (entity: Entity) : Promise<Entity> => {
        return ApiRequestServeur.postAndParse<Entity>(
            buildApiUrl('api/app/superadmin/entity'),
            entity
        );
    },
    updateEntity: async (entity: Entity) : Promise<Entity> => {
        return ApiRequestServeur.putAndParse<Entity>(
            buildApiUrl(`api/app/superadmin/entity/${entity.id}`),
            entity
        );
    },
    delete: async (entityId: number) : Promise<void> => {
        return ApiRequestServeur.deleteRequest(
            buildApiUrl(`api/app/superadmin/entity/${entityId}`)
        );
    }
};