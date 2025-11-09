import getUser from "@/src/application/useCases/User/getUser";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import UserReview from "@/src/component/user/review/userReview";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/UserRepositoryImpl";

interface UserPageProps {
    params: Promise<{ entityId: number, userId: number }>;
}

export default async function UserPage({ params }: UserPageProps) {
    const [resolvedParams] = await Promise.all([params]);
    const { entityId, userId } = resolvedParams;

    return (
        <ShowMenu
            body={async (user, entity, cinema) => {
                const userShow = await getUser(UserRepositoryImpl, entityId, userId);

                if (!userShow) {
                    return <div>User not found</div>;
                }

                return (
                    <UserReview entityId={entityId} user={userShow} />
                );
            }}
            entityId={entityId}
            cinemaId={null}
            page="userReview"
        />
    );
}