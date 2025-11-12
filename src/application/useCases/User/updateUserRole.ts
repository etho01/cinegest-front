import { UserRepository } from "../../repositories/UserRepository";

export interface rolesCinemaListType {
    cinemas: number[];
    roles: number[];
}

export const updateUserRole = async (repo: UserRepository, entityId: number, userId: number, rolesUser: rolesCinemaListType[]) => {
    const userUpdated = await repo.updateUserRoles(entityId, userId, rolesUser);
    return userUpdated;
}