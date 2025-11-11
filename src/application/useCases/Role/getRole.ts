import { Role } from "@/src/domain/User";
import { RoleRepository } from "../../repositories/RoleRepository";


export const getRole = async (roleRepository: RoleRepository, entityId: number, roleId: number) : Promise<Role> => {
    return await roleRepository.getRole(entityId, roleId);
}