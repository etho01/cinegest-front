import { getAllOptions } from "@/src/application/useCases/Cinema/Settings/Option/getAllOptions";
import { getRooms } from "@/src/application/useCases/Cinema/Settings/room/getRooms";
import { getAllStorages } from "@/src/application/useCases/Cinema/Settings/Storage/getAllStorage";
import { RoomManager } from "@/src/component/cinema/settings/room/RoomManager";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { UserHasRight } from "@/src/domain/User";
import { OptionsRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/OptionsRepositoryImpl";
import { RoomRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/RoomRepositoryImpl";
import { StorageRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/StorageRepositoryImpl";
import { getObjectFromSearchParams } from "@/src/lib/url";


interface RoomsPageProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RoomsSettingsPage({ params, searchParams }: RoomsPageProps) {
    const { entityId, cinemaId } = await params;
    const searchParamsObj = await searchParams;
    const page = searchParamsObj.page ? Number(searchParamsObj.page) : 1;
    const search = searchParamsObj.search ? String(searchParamsObj.search) : "";

    const options = getObjectFromSearchParams(searchParamsObj, 'options').map((v) => parseInt(v));

    const storages = getObjectFromSearchParams(searchParamsObj, 'storages').map((v) => parseInt(v));

    return (
        <ShowMenu
            body={async (user) => {
                if (UserHasRight(user, 'viewRooms', cinemaId) === false) {
                 //   throw new Unauthorized('Vous n\'avez pas les droits nécessaires pour accéder à cette page.');
                }
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
                        user={user}
                    />
                );
            }}
            entityId={entityId}
            cinemaId={cinemaId}
            page="cinemaRoomsSettings"
        />
    );
}