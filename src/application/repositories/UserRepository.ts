import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { User, UserLog } from "@/src/domain/User";
import { getUsersParams } from "../useCases/User/getUsers";


export interface UserRepository {
    connect : (userLog : UserLog) => Promise<string>,
    logout : () => Promise<void>,
    me : () => Promise<User>,
    getUsers : (entityId : number, params: getUsersParams) => Promise<Paginator<User>>,
    getUser : (entityId : number, userId : number) => Promise<User | null>,
    addUser : (entityId : number, user : User) => Promise<User>,
    updateUser : (entityId : number, user : User) => Promise<User>,
    deleteUser : (entityId : number, userId : number) => Promise<void>,
}