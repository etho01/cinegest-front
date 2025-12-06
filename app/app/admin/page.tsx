import { fetchSuperadmins } from "@/src/application/useCases/superadmin/fetchSuperadmins";
import SuperadminManager from "@/src/component/superadmin/superadmin/SuperadminManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { Unauthorized, UserIsSuperAdmin } from "@/src/domain/User";
import { SuperadminRepositoryImpl } from "@/src/infrastructure/repositories/SuperadminRepositoryImpl";


interface AdminPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminPage({searchParams}: AdminPageProps) {
    const params = await searchParams;
    const page = params.page ? Number(params.page) : 1;
    const search = params.search ? String(params.search) : "";

    return (
        <ShowMenu page="superadmin" entityId={null} cinemaId={null} body={async (user) => {
            const admins = await fetchSuperadmins(SuperadminRepositoryImpl, { page, search });

            if (UserIsSuperAdmin(user) === false) {
                throw new Unauthorized('Vous devez être super administrateur pour accéder à cette page.');
            }

            return (
                <SuperadminManager initialData={admins} initialParams={{ page, search }} />
            )

        }} />
    )
}