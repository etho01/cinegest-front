import { getUsers } from "@/src/application/useCases/User/getUsers";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { UserManager } from "@/src/component/user/userManager";
import { UserHasRight } from "@/src/domain/User";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/UserRepositoryImpl";

interface UserPageProps {
    params: Promise<{ entityId: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function UserPage({ params, searchParams }: UserPageProps) {
    const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams]);
    const { entityId } = resolvedParams;
    const page = resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1;
    const search = resolvedSearchParams.search ? String(resolvedSearchParams.search) : "";

    return (
        <ShowMenu
            body={async (user) => {
                const users = await getUsers(UserRepositoryImpl, entityId ? parseInt(entityId, 10) : 0, {
                    search: search,
                    page: page
                });
                if (UserHasRight(user, 'viewUsers', null) === false) {
                //    throw new Unauthorized('Vous n\'avez pas les droits nécessaires pour accéder à cette page.');
                }
                

                return (
                    <UserManager user={user} entityId={parseInt(entityId)} initialData={users} initialParams={{ search, page }} />
                );
            }}
            entityId={entityId ? parseInt(entityId, 10) : null}
            cinemaId={null}
            page="userManager"
        />
    );
}