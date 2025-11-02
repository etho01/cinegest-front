import { EntityRepository } from "../../repositories/EntityRepository";


export type PropsFetchEntities = {
    page : number;
    search?: string;
};

export const fetchEntities = async (repo: EntityRepository, props: PropsFetchEntities) => {
    let entities = await repo.fetchEntities(props);
    return entities
}