import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Role } from "@/src/domain/User";
import { RoleRepository } from "../../repositories/RoleRepository";

export type PropsFetchEntities = {
    page : number;
    search?: string;
};

export const getRoles = async (roleRepository: RoleRepository, entityId: number, props: PropsFetchEntities) : Promise<Paginator<Role>> => {
    return await roleRepository.getRoles(entityId, props);
}