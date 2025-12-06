import { getAllActiveMovie } from "@/src/application/useCases/Cinema/Movie/getAllActiveMovie";
import { getSessions } from "@/src/application/useCases/Cinema/Sessions/getSessions";
import { getAllRooms } from "@/src/application/useCases/Cinema/Settings/room/getAllRooms";
import { getAllStorages } from "@/src/application/useCases/Cinema/Settings/Storage/getAllStorage";
import { SessionManager } from "@/src/component/cinema/session/SessionManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { Unauthorized, UserHasRight } from "@/src/domain/User";
import { MovieRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/MovieRepositoryImpl";
import { SessionRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/SessionRepositoryImpl";
import { RoomRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/RoomRepositoryImpl";
import { StorageRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/StorageRepositoryImpl";
import { getObjectFromSearchParams } from "@/src/lib/url";

interface SessionPageProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SessionPage({ params, searchParams }: SessionPageProps) {
    const { entityId, cinemaId } = await params;

    const searchParamsObj = await searchParams;
    const statusParams = getObjectFromSearchParams(searchParamsObj, 'status');
    const roomsParams = getObjectFromSearchParams(searchParamsObj, 'rooms').map((v) => parseInt(v));
    const moviesParams = getObjectFromSearchParams(searchParamsObj, 'movies').map((v) => parseInt(v));
    
    return (
        <ShowMenu
            body={async (user) => {
                if (UserHasRight(user, 'viewCinemaSessions', cinemaId) === false) {
                    throw new Unauthorized('Vous n\'avez pas les droits nécessaires pour accéder à cette page.');
                }

                const activeMovies = await getAllActiveMovie(MovieRepositoryImpl, entityId, cinemaId);
                const rooms = await getAllRooms(RoomRepositoryImpl, entityId, cinemaId);
                const storages = await getAllStorages(StorageRepositoryImpl, entityId, cinemaId);
                const sessions = await getSessions(SessionRepositoryImpl, entityId, cinemaId, { 
                    page: 1, 
                    status: statusParams, 
                    rooms: roomsParams, 
                    movies: moviesParams 
                });

                return (
                    <SessionManager
                        entityId={entityId}
                        cinemaId={cinemaId}
                        initialParams={{
                            movies: moviesParams,
                            rooms: roomsParams,
                            status: statusParams,
                            page: 1,
                        }}
                        initialData={sessions}
                        activeMovies={activeMovies}
                        rooms={rooms}
                        storages={storages}
                        user={user}
                    />
                );
            }}
            entityId={entityId}
            cinemaId={cinemaId}
            page="cinemaSession"
        />
    )
}