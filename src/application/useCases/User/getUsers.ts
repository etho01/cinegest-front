import { UserRepository } from "../../repositories/UserRepository";

export interface getUsersParams {
    search?: string;
    page?: number;
}

export const getUsers = (repo : UserRepository, entityId: number, params: getUsersParams) => {
    return repo.getUsers(entityId, params);
};