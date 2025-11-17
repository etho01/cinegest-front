import { RoomRepository } from "@/src/application/repositories/Cinema/Settings/RoomRepository";
import { Room } from "@/src/domain/Cinema/Settings/Room";


export const getAllRooms = async (repo : RoomRepository, entityId: number, cinemaId: number) : Promise<Room[]> => {
    return await repo.getAllRooms(entityId, cinemaId);
}