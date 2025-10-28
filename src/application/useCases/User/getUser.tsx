import { User } from "@/src/domain/User";
import { UserRepository } from "../../repositories/UserRepository";

export const getUser = async (repo : UserRepository) : Promise<User> => {
    return repo.getUser();
}