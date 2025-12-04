import { getAllActiveMovie } from "@/src/application/useCases/Cinema/Movie/getAllActiveMovie";
import { getAllRooms } from "@/src/application/useCases/Cinema/Settings/room/getAllRooms";
import { getAllStorages } from "@/src/application/useCases/Cinema/Settings/Storage/getAllStorage";
import { getStorageItems } from "@/src/application/useCases/Cinema/StorageItem/getStorageItems";
import { StorageItemManager } from "@/src/component/cinema/storage/StorageItemManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { MovieRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/MovieRepositoryImpl";
import { RoomRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/RoomRepositoryImpl";
import { StorageRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/StorageRepositoryImpl";
import { StorageItemRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/StorageItemRepositoryImpl";
import { getObjectFromSearchParams } from "@/src/lib/url";

interface StoragePageProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function StoragePage({ params, searchParams }: StoragePageProps) {
    const { entityId, cinemaId } = await params;
    const searchParamsObj = await searchParams;
    const page = searchParamsObj.page ? Number(searchParamsObj.page) : 1;

    return (
        <ShowMenu 
            body={async (user) => {
                const rooms = await getAllRooms(RoomRepositoryImpl, entityId, cinemaId);
                const storages = await getAllStorages(StorageRepositoryImpl, entityId, cinemaId);
                const movies = await getAllActiveMovie(MovieRepositoryImpl, entityId, cinemaId);

                const moviesFiltered = getObjectFromSearchParams(searchParamsObj, 'movies');
                const roomsFiltered = getObjectFromSearchParams(searchParamsObj, 'rooms');
                const storageFiltered = getObjectFromSearchParams(searchParamsObj, 'storage');
                
                const storageItems = await getStorageItems(StorageItemRepositoryImpl, entityId, cinemaId, {
                    page: page,
                    movies: moviesFiltered ? (Array.isArray(moviesFiltered) ? moviesFiltered.map((id) => Number(id)) : [Number(moviesFiltered)]) : undefined,
                    storage: storageFiltered ? (Array.isArray(storageFiltered) ? storageFiltered.map((id) => Number(id)) : [Number(storageFiltered)]) : undefined,
                    rooms: roomsFiltered ? (Array.isArray(roomsFiltered) ? roomsFiltered.map((id) => Number(id)) : [Number(roomsFiltered)]) : undefined,
                });

                return (
                    <StorageItemManager
                        entityId={entityId}
                        cinemaId={cinemaId}
                        activeMovies={movies}
                        rooms={rooms}
                        storages={storages}
                        initialParams={{
                            page: page,
                            movies: moviesFiltered ? (Array.isArray(moviesFiltered) ? moviesFiltered.map((id) => Number(id)) : [Number(moviesFiltered)]) : undefined,
                            storage: storageFiltered ? (Array.isArray(storageFiltered) ? storageFiltered.map((id) => Number(id)) : [Number(storageFiltered)]) : undefined,
                            rooms: roomsFiltered ? (Array.isArray(roomsFiltered) ? roomsFiltered.map((id) => Number(id)) : [Number(roomsFiltered)]) : undefined,
                        }}
                        initialData={storageItems}
                    />
                );
            }}
            entityId={entityId}
            cinemaId={cinemaId}
            page="cinemaStorage" 
        />
    );
}