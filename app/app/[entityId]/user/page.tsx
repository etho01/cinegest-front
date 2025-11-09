import { getUsers } from "@/src/application/useCases/User/getUsers";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { UserManager } from "@/src/component/user/userManager";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/UserRepositoryImpl";
import { en } from "zod/locales";

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
            body={async (user, entity, cinema) => {
                let users = await getUsers(UserRepositoryImpl, entityId ? parseInt(entityId, 10) : 0, {
                    search: search,
                    page: page
                });
                return (
                    <UserManager entityId={parseInt(entityId)} initialData={users} initialParams={{ search, page }} />
                );
            }}
            entityId={entityId ? parseInt(entityId, 10) : null}
            cinemaId={null}
            page="userManager"
        />
    );
}