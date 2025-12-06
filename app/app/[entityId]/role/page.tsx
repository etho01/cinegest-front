import { getRoles } from "@/src/application/useCases/Role/getRoles";
import { RoleManager } from "@/src/component/role/RoleManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { Unauthorized, UserHasRight } from "@/src/domain/User";
import { RoleRepositoryImpl } from "@/src/infrastructure/repositories/RoleRepositoryImpl";

interface CinemaPageProps {
    params: Promise<{ entityId: number }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page(props: CinemaPageProps) {
    const { params, searchParams } = props;
    const { entityId } = await params;
    const searchParamsObj = await searchParams;
    const page = searchParamsObj.page ? Number(searchParamsObj.page) : 1;
    const search = searchParamsObj.search ? String(searchParamsObj.search) : "";
    return (
        <ShowMenu
            body={async (user) => {
                const roles = await getRoles(RoleRepositoryImpl, entityId, { search, page });

                if (UserHasRight(user, 'viewRoles', null) === false) {
                    throw new Unauthorized('Vous n\'avez pas les droits nécessaires pour accéder à cette page.');
                }

                return (
                    <RoleManager user={user} initialData={roles} initialParams={{ search, page }} entityId={entityId}  />
                );
            }}
            entityId={entityId}
            cinemaId={null}
            page="roleList"
        />
    );
}