import { UserRepository } from "../../repositories/UserRepository";
import { User } from "@/src/domain/User";


export const addUser = async (repo: UserRepository, entityId: number, user: User) : Promise<User> => {
    const createdUser = await repo.addUser(entityId, user);
    return createdUser;
}