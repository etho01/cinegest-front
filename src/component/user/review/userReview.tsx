import { User } from "@/src/domain/User";
import Card from "../../ui/card";
import { Tab } from "../../ui/tab/Tab";
import { UserTabUpdate } from "./tab/userTabUpdate";
import UserManageRole from "./tab/userManageRole";
import { CinemaRepositoryImpl } from "@/src/infrastructure/repositories/CinemaRepositoryImpl";
import { getAllCinemasByEntity } from "@/src/application/useCases/Cinema/getAllCinemasByEntity";

interface UserReviewProps {
    user : User;
    entityId: number;
}

export default async function UserReview({ user, entityId } : UserReviewProps) 
{
    let allCinemaList = await getAllCinemasByEntity(CinemaRepositoryImpl, entityId);

    return (
        <Card>
            <Tab 
                tabList={[
                    {
                        header: {
                            title: "Informations",
                        },
                        body: {
                            content: (
                                <UserTabUpdate entityId={entityId} user={user} />
                            ),
                        },
                    },
                    {
                        header: {
                            title: "Roles",
                        },
                        body: {
                            content: (
                                <UserManageRole user={user} entityId={entityId} allCinemaList={allCinemaList} />
                            ),
                        },
                    },
                ]}
            />
        </Card>
    );
}

