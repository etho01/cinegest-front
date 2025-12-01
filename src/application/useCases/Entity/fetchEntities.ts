import { EntityRepository } from "../../repositories/EntityRepository";


export type PropsFetchEntities = {
    page : number;
    search?: string;
};

export const fetchEntities = async (repo: EntityRepository, props: PropsFetchEntities) => {
    const entities = await repo.fetchEntities(props);
    return entities
}