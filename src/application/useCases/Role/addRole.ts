import { Role } from "@/src/domain/User";
import { RoleRepository } from "../../repositories/RoleRepository";


export const addRole = async (repository: RoleRepository, entityId: number, role: Role) => {
    const createdRole = await repository.addRole(entityId, role);
    return createdRole;
};