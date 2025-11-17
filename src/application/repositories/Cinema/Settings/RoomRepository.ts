import { getRoomsProps } from "@/src/application/useCases/Cinema/Settings/room/getRooms";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Room } from "@/src/domain/Cinema/Settings/Room";


export interface RoomRepository {
    getRooms(entityId: number, cinemaId: number, props: getRoomsProps): Promise<Paginator<Room>>;
    getAllRooms(entityId: number, cinemaId: number): Promise<Room[]>;
    addRoom(entityId: number, cinemaId: number, room: Room): Promise<Room>;
    updateRoom(entityId: number, cinemaId: number, room: Room): Promise<Room>;
    deleteRoom(entityId: number, cinemaId: number, roomId: number): Promise<void>;
}