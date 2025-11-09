import { User } from "@/src/domain/User";
import { UserRepository } from "../../repositories/UserRepository";

export const me = async (repo : UserRepository) : Promise<User> => {
    return repo.me();
}