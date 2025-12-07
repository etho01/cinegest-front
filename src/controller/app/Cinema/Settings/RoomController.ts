"use server";
import { addRoom } from "@/src/application/useCases/Cinema/Settings/room/addRoom";
import { updateRoom } from "@/src/application/useCases/Cinema/Settings/room/updateRoom";
import { deleteRoom } from "@/src/application/useCases/Cinema/Settings/room/deleteRoom";
import { Room, RoomSchema } from "@/src/domain/Cinema/Settings/Room";
import { RoomRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/RoomRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";

export const addOrUpdateRoomController = actionClient.schema(
    RoomSchema.extend({
        entityId: z.number(),
        cinemaId: z.number(),
    })
).action(async ({ parsedInput : input }) => {
    // Transformer l'input pour correspondre au type Room avec les propriétés requises
    const roomData = {
        ...input,
        options: [], // Valeur par défaut vide, sera gérée par le repository
        storages: [] // Valeur par défaut vide, sera gérée par le repository
    } as Room;
    
    if (input.id === 0)
    {
        return await addRoom(RoomRepositoryImpl, input.entityId, input.cinemaId, roomData);
    }
    else
    {
        return await updateRoom(RoomRepositoryImpl, input.entityId, input.cinemaId, roomData);
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