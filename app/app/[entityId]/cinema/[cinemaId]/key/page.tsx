import { getKeys } from "@/src/application/useCases/Cinema/Key/getKeys";
import { getAllActiveMovie } from "@/src/application/useCases/Cinema/Movie/getAllActiveMovie";
import { KeyManager } from "@/src/component/cinema/key/KeyManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { MovieRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/MovieRepositoryImpl";
import { KeyRepositoryImpl } from "@/src/infrastructure/repositories/KeyRepositoryImpl";



interface KeyPageProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
}

export default async function KeyPage({ params }: KeyPageProps) {
    const { entityId, cinemaId } = await params;
    return (
        <ShowMenu
            body={async (user) => {
                const allActiveMovie = await getAllActiveMovie(MovieRepositoryImpl, entityId, cinemaId);
                const keys = await getKeys(KeyRepositoryImpl, entityId, cinemaId, { page: 1 });

                console.log(allActiveMovie);

                return (
                    <KeyManager 
                        entityId={entityId} 
                        cinemaId={cinemaId} 
                        allActiveMovie={allActiveMovie} 
                        initialParams={{ page: 1 }} 
                        initialData={keys}
                    />
                );
            }}
            entityId={entityId}
            cinemaId={cinemaId}
            page="cinemaKey"
        />
    );
}