import { User } from "@/src/domain/User";
import { UserRepository } from "../../repositories/UserRepository";


export const updateMe = (userRepository: UserRepository, user: User): Promise<User> => {
    return userRepository.updateMe(user);
}