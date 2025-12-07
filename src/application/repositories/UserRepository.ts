import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { User, UserLog, PasswordResetRequest, PasswordReset } from "@/src/domain/User";
import { getUsersParams } from "../useCases/User/getUsers";
import { rolesCinemaListType } from "../useCases/User/updateUserRole";
import { UpdateMePasswordProps } from "../useCases/User/updateMePassword";


export interface UserRepository {
    connect : (userLog : UserLog) => Promise<string>,
    logout : () => Promise<void>,
    me : () => Promise<User>,
    getUsers : (entityId : number, params: getUsersParams) => Promise<Paginator<User>>,
    getUser : (entityId : number, userId : number) => Promise<User | null>,
    addUser : (entityId : number, user : User) => Promise<User>,
    updateUser : (entityId : number, user : User) => Promise<User>,
    deleteUser : (entityId : number, userId : number) => Promise<void>,
    updateUserRoles : (entityId: number, userId: number, rolesUser: rolesCinemaListType[]) => Promise<User>,
    updateUserRights : (entityId: number, userId: number, rights: string[]) => Promise<User>,
    updateMe : (user : User) => Promise<User>,
    updateMePassword : (props : UpdateMePasswordProps) => Promise<void>,
    requestPasswordReset : (request: PasswordResetRequest) => Promise<void>,
    resetPassword : (reset: PasswordReset) => Promise<void>,
}