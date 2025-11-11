import { Role } from "@/src/domain/User";
import { PropsFetchEntities } from "../useCases/Role/getRoles";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";


export interface RoleRepository {
    getRoles: (entityId: number, props: PropsFetchEntities) => Promise<Paginator<Role>>;
    getRole: (entityId: number, roleId: number) => Promise<Role>;
    addRole: (entityId: number, role: Role) => Promise<Role>;
    updateRole: (entityId: number, role: Role) => Promise<Role>;
    deleteRole: (entityId: number, roleId: number) => Promise<void>;
}