import { UserLog } from "@/src/domain/User";
import { UserRepository } from "../../repositories/UserRepository";

export const connect = async (repo: UserRepository, userLog : UserLog) => {

    const token = await repo.connect(userLog);
    return token
}