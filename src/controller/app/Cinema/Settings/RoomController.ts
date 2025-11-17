"use server";
import { addRoom } from "@/src/application/useCases/Cinema/Settings/room/addRoom";
import { deleteRoom } from "@/src/application/useCases/Cinema/Settings/room/deleteRoom";
import { updateRoom } from "@/src/application/useCases/Cinema/Settings/room/updateRoom";
import { RoomSchema } from "@/src/domain/Cinema/Settings/Room";
import { RoomRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/RoomRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";

export const addOrUpdateRoomController = actionClient.schema(
    RoomSchema.extend({
        entityId: z.number(),
        cinemaId: z.number(),
    })
).action(async ({ parsedInput : input }) => {
    if (input.id === 0)
    {
        return await addRoom(RoomRepositoryImpl, input.entityId, input.cinemaId, input);
    }
    else
    {
        return await updateRoom(RoomRepositoryImpl, input.entityId, input.cinemaId, input);
    }
})

export const deleteRoomController = actionClient.schema(
    z.object({
        entityId: z.number(),
        cinemaId: z.number(),
        roomId: z.number()
    })
).action(async ({parsedInput: { entityId, cinemaId, roomId }}) => {
    return await deleteRoom(RoomRepositoryImpl, entityId, cinemaId, roomId);
});