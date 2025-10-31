import { ShowMenu } from "@/src/component/menu/showMenu";
import { User } from "@/src/domain/User";


export default async function Page () {
    return (
        <ShowMenu page="dashboard" entityId={null} cinemaId={null} body={async (user : User) => {
            return (
                <div>
                    {user.email}
                </div>
            )
        }} />
    )
}