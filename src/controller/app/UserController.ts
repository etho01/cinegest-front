"use server"
import { addUser } from "@/src/application/useCases/User/addUser";
import { User, UserSchema } from "@/src/domain/User";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/UserRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";

export const addUserController = actionClient.schema(
    UserSchema.extend({ entityId: z.number() })
).action(async ({parsedInput: user}) => {
    let userSaved : User;
    console.log("Adding user:", user);
    userSaved = await addUser(UserRepositoryImpl, user.entityId, { ...user, isSuperAdmin: false });
    console.log("User added:", userSaved);

    return userSaved;
});