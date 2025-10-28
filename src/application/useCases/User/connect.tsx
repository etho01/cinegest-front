import { UserLog } from "@/src/domain/User";
import { UserRepository } from "../../repositories/UserRepository";
import { cookies } from "next/headers";


export const connect = async (repo: UserRepository, userLog : UserLog) => {

    let token = await repo.connect(userLog);
    return token
}