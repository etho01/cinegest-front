import getUser from "@/src/application/useCases/User/getUser";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import UserReview from "@/src/component/user/review/userReview";
import { Unauthorized, UserHasRight } from "@/src/domain/User";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/UserRepositoryImpl";

interface UserPageProps {
    params: Promise<{ entityId: number, userId: number }>;
}

export default async function UserPage({ params }: UserPageProps) {
    const [resolvedParams] = await Promise.all([params]);
    const { entityId, userId } = resolvedParams;

    return (
        <ShowMenu
            body={async (user) => {
                const userShow = await getUser(UserRepositoryImpl, entityId, userId);

                if (!userShow) {
                    return <div>User not found</div>;
                }

                if (UserHasRight(user, 'viewUsers', null) === false) {
                    throw new Unauthorized('Vous n\'avez pas les droits nécessaires pour accéder à cette page.');
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