import { fetchEntities } from "@/src/application/useCases/Entity/fetchEntities";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import EntityManager from "@/src/component/superadmin/entity/EntityManager";
import { EntityRepositoryImpl } from "@/src/infrastructure/repositories/EntityRepositoryImpl";
import { Unauthorized, UserIsSuperAdmin } from "@/src/domain/User";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gestion des entités - CineGest",
    description: "Gérez les entités de l'application",
};

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: PageProps) {

    const params = await searchParams;
    const page = params.page ? Number(params.page) : 1;
    const search = params.search ? String(params.search) : "";
    
    return (
        <ShowMenu page="entity" entityId={null} cinemaId={null} body={async (user) => {
            const entities = await fetchEntities(EntityRepositoryImpl, { page, search });

            if (UserIsSuperAdmin(user) === false) {
                throw new Unauthorized('Vous devez être super administrateur pour accéder à cette page.');
            }

            return (
                <EntityManager initialData={entities} initialParams={{ page, search }} />
            )
        }} />
    )
}