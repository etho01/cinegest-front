import { ShowMenu } from "@/src/component/menu/showMenu";


export default function Page() {
    return (
        <ShowMenu page="entity" entityId={null} cinemaId={null} body={async (user) => {
            return (
                <div>
                    Entity Page - User: {user.email}
                </div>
            )
        }} />
    )
}