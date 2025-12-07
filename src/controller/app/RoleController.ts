"use server";
import { addRole } from "@/src/application/useCases/Role/addRole";
import { deleteRole } from "@/src/application/useCases/Role/deleteRole";
import { updateRole } from "@/src/application/useCases/Role/updateRole";
import { Role, RoleSchema } from "@/src/domain/User";
import { RoleRepositoryImpl } from "@/src/infrastructure/repositories/RoleRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";

export const addOrUpdateRoleController = actionClient.schema(
    RoleSchema
).action(async ({parsedInput: role}) => {
    // Convertir undefined en null pour cinemaId si nécessaire
    const roleData = {
        ...role,
        cinemaId: role.cinemaId ?? null
    } as Role;
    
    let roleSaved : Role;
    if (role.id === 0) {
        roleSaved = await addRole(RoleRepositoryImpl, role.entityId, roleData);
    } else {
        roleSaved =  await updateRole(RoleRepositoryImpl, role.entityId, roleData);
    }

    return roleSaved;
});


export const deleteRoleController = actionClient.schema(
    z.object({
        entityId: z.number(),
        roleId : z.number()
    })
).action(async ({parsedInput: { entityId, roleId }}) => {
    await deleteRole(RoleRepositoryImpl, entityId, roleId);
    return true;
});