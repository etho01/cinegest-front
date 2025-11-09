import { User } from "@/src/domain/User";
import Card from "../../ui/card";
import { Tab } from "../../ui/tab/Tab";
import { UserTabUpdate } from "./tab/userTabUpdate";

interface UserReviewProps {
    user : User;
    entityId: number;
}

export default async function UserReview({ user, entityId } : UserReviewProps) 
{
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
                            title: "Liste des connexions",
                        },
                        body: {
                            content: (
                                <div>
                                    <p><strong>ID:</strong> {user.id}</p>
                                    {/* Add more user fields as necessary */}
                                </div>
                            ),
                        },
                    },
                ]}
            />
        </Card>
    );
}

