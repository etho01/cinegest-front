import { KeySchema } from "@/src/domain/Cinema/Key";
import { KeyRepositoryImpl } from "@/src/infrastructure/repositories/KeyRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";


export const addKeyController = actionClient.schema(
    KeySchema
).action(async ({parsedInput: key}) => {
    
})