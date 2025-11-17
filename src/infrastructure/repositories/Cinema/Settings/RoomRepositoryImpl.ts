import { RoomRepository } from "@/src/application/repositories/Cinema/Settings/RoomRepository";
import { getRoomsProps } from "@/src/application/useCases/Cinema/Settings/room/getRooms";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Room } from "@/src/domain/Cinema/Settings/Room";
import { ApiRequestServeur } from "@/src/lib/request/ApiRequestServeur";
import { throwErrorResponse } from "@/src/lib/request/Request";


export const RoomRepositoryImpl : RoomRepository = {
    getRooms: async (entityId: number, cinemaId: number, props: getRoomsProps) => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/room`, props, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Paginator<Room>;
    },
    getAllRooms: async (entityId: number, cinemaId: number) => {
        let resp = await ApiRequestServeur.GET(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/room/all`, {}, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Room[];
    },
    addRoom: async (entityId: number, cinemaId: number, room) => {
        let resp = await ApiRequestServeur.POST(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/room`, room, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Room;
    },
    updateRoom: async (entityId: number, cinemaId: number, room) => {
        let resp = await ApiRequestServeur.PUT(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/room/${room.id}`, room, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
        return body as Room;
    },
    deleteRoom: async (entityId: number, cinemaId: number, roomId: number) => {
        let resp = await ApiRequestServeur.DELETE(`${process.env.API_URL}api/app/entity/${entityId}/cinemas/${cinemaId}/settings/room/${roomId}`, {}, {});
        await throwErrorResponse(resp);

        let text = await resp.text();
        let body = JSON.parse(text);
    },
}