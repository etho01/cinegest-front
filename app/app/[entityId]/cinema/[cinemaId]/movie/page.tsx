import { ShowMenu } from "@/src/component/ui/menu/showMenu";


interface OptionsPageProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MoviePage({ params, searchParams }: OptionsPageProps) {
    const { entityId, cinemaId } = await params;
    const searchParamsObj = await searchParams;
    const page = searchParamsObj.page ? Number(searchParamsObj.page) : 1;
    const search = searchParamsObj.search ? String(searchParamsObj.search) : "";

    return (
        <ShowMenu
            body={async (user, entity, cinema) => {
                return (
                    <div>
                        <h1>Page d'aperçu du cinéma</h1>
                        <p>Bienvenue sur la page d'aperçu du cinéma {cinema.name} de l'entité {entity.name}.</p>
                    </div>
                );
            }}
            entityId={entityId}
            cinemaId={cinemaId}
            page="cinemaMovie"

        />
    );
}