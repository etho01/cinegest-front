import { Role } from "@/src/domain/User";
import { RoleRepository } from "../../repositories/RoleRepository";


export const updateRole = async (repository: RoleRepository, entityId: number, role: Role) => {
    const updatedRole = await repository.updateRole(entityId, role);
    return updatedRole;
}