import { RoleRepository } from "../../repositories/RoleRepository";


export async function deleteRole(roleRepository: RoleRepository, entityId: number, roleId: number) {
    await roleRepository.deleteRole(entityId, roleId);
}
