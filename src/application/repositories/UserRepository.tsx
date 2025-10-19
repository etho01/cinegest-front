import { UserLog } from "@/src/domain/entities/User";


export interface UserRepository {
    connect : (userLog : UserLog) => Promise<void>
}