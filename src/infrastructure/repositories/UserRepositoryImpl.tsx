import { UserRepository } from "@/src/application/repositories/UserRepository";
import { UserLog } from "@/src/domain/entities/User";

export const UserRepositoryImpl: UserRepository = {
    connect : async (userLog : UserLog) => {
        console.log('d');
    }
}