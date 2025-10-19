"use server";

import { actionClient } from "@/lib/safe-action-client";
import { connect } from "@/src/application/useCases/User/connect";
import { UserLogSchema } from "@/src/domain/entities/User";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/UserRepositoryImpl";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


export const Register = actionClient.schema(
    UserLogSchema
).action(async ({parsedInput: input}) => {

    connect(UserRepositoryImpl, input);
    revalidatePath('/')
})