import { getKeys } from "@/src/application/useCases/Cinema/Key/getKeys";
import { getAllActiveMovie } from "@/src/application/useCases/Cinema/Movie/getAllActiveMovie";
import { getAllRooms } from "@/src/application/useCases/Cinema/Settings/room/getAllRooms";
import { KeyManager } from "@/src/component/cinema/key/KeyManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { MovieRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/MovieRepositoryImpl";
import { RoomRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/RoomRepositoryImpl";
import { KeyRepositoryImpl } from "@/src/infrastructure/repositories/KeyRepositoryImpl";



interface KeyPageProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
}

export default async function KeyPage({ params }: KeyPageProps) {
    const { entityId, cinemaId } = await params;
    return (
        <ShowMenu
            body={async (user) => {
                const activeMovies = await getAllActiveMovie(MovieRepositoryImpl, entityId, cinemaId);
                const keys = await getKeys(KeyRepositoryImpl, entityId, cinemaId, { page: 1 });
                const rooms = await getAllRooms(RoomRepositoryImpl, entityId, cinemaId);

                return (
                    <KeyManager 
                        entityId={entityId} 
                        cinemaId={cinemaId} 
                        activeMovies={activeMovies} 
                        initialParams={{ page: 1 }} 
                        initialData={keys}
                        rooms={rooms}
                    />
                );
            }}
            entityId={entityId}
            cinemaId={cinemaId}
            page="cinemaKey"
        />
    );
}