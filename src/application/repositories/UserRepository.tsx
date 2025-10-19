import { User, UserLog } from "@/src/domain/entities/User";


export interface UserRepository {
    connect : (userLog : UserLog) => Promise<string>,
    logout : () => Promise<void>,
    getUser : () => Promise<User>
}