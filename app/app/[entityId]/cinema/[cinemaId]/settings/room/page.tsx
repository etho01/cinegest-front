import { getAllOptions } from "@/src/application/useCases/Cinema/Settings/Option/getAllOptions";
import { getRooms } from "@/src/application/useCases/Cinema/Settings/room/getRooms";
import { getAllStorages } from "@/src/application/useCases/Cinema/Settings/Storage/getAllStorage";
import { RoomManager } from "@/src/component/cinema/settings/room/RoomManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { OptionsRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/OptionsRepositoryImpl";
import { RoomRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/RoomRepositoryImpl";
import { StorageRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/StorageRepositoryImpl";


interface RoomsPageProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RoomsSettingsPage({ params, searchParams }: RoomsPageProps) {
    const { entityId, cinemaId } = await params;
    const searchParamsObj = await searchParams;
    const page = searchParamsObj.page ? Number(searchParamsObj.page) : 1;
    const search = searchParamsObj.search ? String(searchParamsObj.search) : "";

    const options = searchParamsObj.options
        ? Array.isArray(searchParamsObj.options)
            ? searchParamsObj.options.map((id) => Number(id))
            : [Number(searchParamsObj.options)]
        : undefined;

    const storages = searchParamsObj.storages
        ? Array.isArray(searchParamsObj.storages)
            ? searchParamsObj.storages.map((id) => Number(id))
            : [Number(searchParamsObj.storages)]
        : undefined;

    return (
        <ShowMenu
            body={async (user) => {
                const rooms = await getRooms(RoomRepositoryImpl, entityId, cinemaId, { page, search });

                const allOptions = await getAllOptions(OptionsRepositoryImpl, entityId, cinemaId);
                const allStorages = await getAllStorages(StorageRepositoryImpl, entityId, cinemaId);

                return (
                    <RoomManager
                        initialData={rooms}
                        initialParams={{ page, search, options, storages }}
                        entityId={entityId}
                        cinemaId={cinemaId}
                        allOptions={allOptions}
                        allStorages={allStorages}
                    />
                );
            }}
            entityId={entityId}
            cinemaId={cinemaId}
            page="cinemaRoomsSettings"
        />
    );
}