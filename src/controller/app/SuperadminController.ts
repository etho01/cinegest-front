"use server";
import { addSuperadmin } from "@/src/application/useCases/superadmin/addSuperadmin";
import { deleteSuperadmin } from "@/src/application/useCases/superadmin/deleteSuperadmin";
import { updateSuperadmin } from "@/src/application/useCases/superadmin/updateSuperadmin";
import { SuperadminSchema } from "@/src/domain/superadmin";
import { SuperadminRepositoryImpl } from "@/src/infrastructure/repositories/SuperadminRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import z from "zod";

export const addOrUpdateSuperadminController = actionClient.schema(
    SuperadminSchema
).action(async ({parsedInput: superadmin}) => {
    let superadminSaved;
    if (superadmin.id == 0) {
        superadminSaved = await addSuperadmin(SuperadminRepositoryImpl, superadmin);
    } else {
        superadminSaved = await updateSuperadmin(SuperadminRepositoryImpl, superadmin);
    }
    return superadminSaved;
});

export const addSuperadminController = actionClient.schema(
    SuperadminSchema
).action(async ({parsedInput: superadmin}) => {
    const superadminCreated = await addSuperadmin(SuperadminRepositoryImpl, superadmin);
    return superadminCreated;
});
    
export const updateSuperadminController = actionClient.schema(
    SuperadminSchema
).action(async ({parsedInput: superadmin}) => {
    const superadminUpdated = await updateSuperadmin(SuperadminRepositoryImpl, superadmin);
    return superadminUpdated;
});

export const deleteSuperadminController = actionClient.schema(
    z.object({
        id: z.number()
    })
).action(async ({parsedInput: superadmin}) => {
    await deleteSuperadmin(SuperadminRepositoryImpl, superadmin.id);
});