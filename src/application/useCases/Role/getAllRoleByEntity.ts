import { RoleRepository } from "../../repositories/RoleRepository";


export const getAllRoleByEntity = async (roleRepository: RoleRepository, entityId: number) => {
    const roles = await roleRepository.getAllRoleByEntity(entityId);
    return roles;
}