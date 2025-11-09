import { User } from "@/src/domain/User";
import { UserRepository } from "../../repositories/UserRepository";


export async function updateUser(userRepository: UserRepository, entityId: number, user: User): Promise<User> {
    return userRepository.updateUser(entityId, user);
}