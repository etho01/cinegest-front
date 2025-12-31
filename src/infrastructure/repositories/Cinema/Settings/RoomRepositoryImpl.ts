import { RoomRepository } from "@/src/application/repositories/Cinema/Settings/RoomRepository";
import { getRoomsProps } from "@/src/application/useCases/Cinema/Settings/room/getRooms";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Room } from "@/src/domain/Cinema/Settings/Room";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { buildApiUrl } from "@/src/lib/config/api";


export const RoomRepositoryImpl : RoomRepository = {
    getRooms: async (entityId: number, cinemaId: number, props: getRoomsProps) => {
        return ApiRequestServeur.getAndParse<Paginator<Room>>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/room`),
            props
        );
    },
    getAllRooms: async (entityId: number, cinemaId: number) => {
        return ApiRequestServeur.getAndParse<Room[]>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/room/all`)
        );
    },
    addRoom: async (entityId: number, cinemaId: number, room) => {
        return ApiRequestServeur.postAndParse<Room>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/room`),
            room
        );
    },
    updateRoom: async (entityId: number, cinemaId: number, room) => {
        return ApiRequestServeur.putAndParse<Room>(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/room/${room.id}`),
            room
        );
    },
    deleteRoom: async (entityId: number, cinemaId: number, roomId: number) => {
        return ApiRequestServeur.deleteRequest(
            buildApiUrl(`api/app/entity/${entityId}/cinemas/${cinemaId}/settings/room/${roomId}`)
        );
    },
}