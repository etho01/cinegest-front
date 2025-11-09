import { User } from "@/src/domain/User";
import { UserRepository } from "../../repositories/UserRepository";


export default async function getUser(repo: UserRepository, entityId: number, userId: number) : Promise<User | null>
{
    return await repo.getUser(entityId, userId);
}