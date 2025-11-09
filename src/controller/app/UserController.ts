"use server"
import { addUser } from "@/src/application/useCases/User/addUser";
import { updateUser } from "@/src/application/useCases/User/updateUser";
import { User, UserSchema } from "@/src/domain/User";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/UserRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";

export const addUserController = actionClient.schema(
    UserSchema.extend({ entityId: z.number() })
).action(async ({parsedInput: user}) => {
    let userSaved : User;
    userSaved = await addUser(UserRepositoryImpl, user.entityId, { ...user, isSuperAdmin: false });

    return userSaved;
});

export const updateUserController = actionClient.schema(
    UserSchema.extend({ entityId: z.number() })
).action(async ({parsedInput: user}) => {
    let userUpdated : User;
    userUpdated = await updateUser(UserRepositoryImpl, user.entityId, { ...user, isSuperAdmin: false });

    return userUpdated;
});