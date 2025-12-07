import { UserLog } from "@/src/domain/User";
import { UserRepository } from "../../repositories/UserRepository";
import { CustomError } from "@/src/domain/global";

export const connect = async (repo: UserRepository, userLog : UserLog) => {

    const token = await repo.connect(userLog);
    if (!token) {
        throw new CustomError("Les informations de connexion sont invalides");
    }
    return token
}