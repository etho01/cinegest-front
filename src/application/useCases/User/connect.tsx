import { UserLog } from "@/src/domain/entities/User";
import { UserRepository } from "../../repositories/UserRepository";


export const connect = async (repo: UserRepository, userLog : UserLog) => {
    await repo.connect(userLog);
}