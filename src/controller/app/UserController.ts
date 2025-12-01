"use server"
import { addUser } from "@/src/application/useCases/User/addUser";
import { updateUser } from "@/src/application/useCases/User/updateUser";
import { UserSchema } from "@/src/domain/User";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/UserRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";

export const addUserController = actionClient.schema(
    UserSchema.extend({ entityId: z.number() })
).action(async ({parsedInput: user}) => {
    const userSaved = await addUser(UserRepositoryImpl, user.entityId, { ...user, isSuperAdmin: false });

    return userSaved;
});

export const updateUserController = actionClient.schema(
    UserSchema.extend({ entityId: z.number() })
).action(async ({parsedInput: user}) => {
    const userUpdated = await updateUser(UserRepositoryImpl, user.entityId, { ...user, isSuperAdmin: false });

    return userUpdated;
});

export const updateUserRoleController = actionClient.schema(
    z.object({
        entityId: z.number(),
        userId: z.number(),
        rolesUser: z.array(z.object({
            roles: z.array(z.number()).min(1, { message: "Au moins un rôle doit être sélectionné" }),
            cinemas: z.array(z.number()).min(1, { message: "Au moins un cinéma doit être sélectionné" })
        })),
        globalRight: z.array(z.string()).optional()
    })
).action(async ({parsedInput: { entityId, userId, rolesUser, globalRight }}) => {
    await UserRepositoryImpl.updateUserRoles(entityId, userId, rolesUser);
    await UserRepositoryImpl.updateUserRights(entityId, userId, globalRight ?? []);
})
