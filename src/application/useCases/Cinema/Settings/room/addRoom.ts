import { RoomRepository } from "@/src/application/repositories/Cinema/Settings/RoomRepository";
import { Room } from "@/src/domain/Cinema/Settings/Room";


export const addRoom = async (repo : RoomRepository, entityId: number, cinemaId: number, room: Room): Promise<Room> => {
    return await repo.addRoom(entityId, cinemaId, room);
}