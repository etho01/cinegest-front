import { User } from "@/src/domain/User";
import Card from "../../ui/card";
import { AccountFormUserData } from "./AccountFormUserData";
import { AccountResetPassword } from "./AccountResetPassword";

export interface AccountFormProps {
    user : User
}

export const AccountForm = ({ user }: AccountFormProps) => {
    return (
        <>
            <Card>
                <AccountFormUserData user={user} />
            </Card>
            <Card>
                <AccountResetPassword />
            </Card>
        </>
    );
}