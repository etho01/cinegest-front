import { RoomRepository } from "@/src/application/repositories/Cinema/Settings/RoomRepository";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Room } from "@/src/domain/Cinema/Settings/Room";

export type getRoomsProps = {
    search?: string;
    page : number;
    options ?: number[];
    storages ?: number[];
}

export const getRooms = async (repo : RoomRepository, entityId: number, cinemaId: number, props: getRoomsProps) : Promise<Paginator<Room>> => {
    return await repo.getRooms(entityId, cinemaId, props);
}