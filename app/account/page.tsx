import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { AccountForm } from "@/src/component/user/Account/AccountForm";


export  default function Compte() {
    return (
        <ShowMenu page="account" entityId={null} cinemaId={null} body={async (user) => {
            return (
                <AccountForm user={user} />
            )
        }} />
    );
}