"use server"
import { addSessions } from "@/src/application/useCases/Cinema/Sessions/addSessions"
import { deleteSession } from "@/src/application/useCases/Cinema/Sessions/deleteSession"
import { SessionRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/SessionRepositoryImpl"
import { actionClient } from "@/src/lib/safe-action-client"
import z from "zod"


export const addSessionController = actionClient.schema(
    z.object({
        entityId: z.number(),
        cinemaId: z.number(),
        sessions: z.array(z.object({
            movieVersionId: z.number({ message: "Vous devez sélectionner une version" }).min(1, { message: "Vous devez sélectionner une version" }),
            roomId: z.number({ message: "Vous devez sélectionner une salle" }).min(1, { message: "Vous devez sélectionner une salle" }),
            startAt: z.date({ message: "Vous devez renseigner la date et l'heure de la séance" }),
        })),
    })
).action(async ({parsedInput}) => {
    await addSessions(SessionRepositoryImpl, parsedInput.entityId, parsedInput.cinemaId, parsedInput)
})

export const deleteSessionController = actionClient.schema(
    z.object({
        entityId: z.number(),
        cinemaId: z.number(),
        sessionId: z.number(),
    })
).action(async ({parsedInput}) => {
    await deleteSession(SessionRepositoryImpl, parsedInput.entityId, parsedInput.cinemaId, parsedInput.sessionId);
})