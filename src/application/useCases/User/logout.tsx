import { UserRepository } from "../../repositories/UserRepository";

export const logout = async (repo: UserRepository) => {

    repo.logout();
}