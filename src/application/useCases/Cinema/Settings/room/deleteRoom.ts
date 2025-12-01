import { RoomRepository } from "@/src/application/repositories/Cinema/Settings/RoomRepository";


export const deleteRoom = async (repo : RoomRepository, entityId: number, cinemaId: number, roomId: number): Promise<void> => {
    await repo.deleteRoom(entityId, cinemaId, roomId);
}