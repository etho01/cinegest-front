import { RoomRepository } from "@/src/application/repositories/Cinema/Settings/RoomRepository";
import { Room } from "@/src/domain/Cinema/Settings/Room";


export const updateRoom = async (repo : RoomRepository, entityId: number, cinemaId: number, room: Room): Promise<Room> => {
    return await repo.updateRoom(entityId, cinemaId, room);
}