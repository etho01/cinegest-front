import { User, UserLog } from "@/src/domain/User";


export interface UserRepository {
    connect : (userLog : UserLog) => Promise<string>,
    logout : () => Promise<void>,
    getUser : () => Promise<User>
}