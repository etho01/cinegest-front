import { UserRepository } from "../../repositories/UserRepository";


export const updateUserRights = async (userRepository: UserRepository, entityId: number, userId: number, rights: string[]) => {
    const userUpdated = await userRepository.updateUserRights(entityId, userId, rights);
    return userUpdated;
}