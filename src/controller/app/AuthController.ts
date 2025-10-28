"use server";

import { connect } from "@/src/application/useCases/User/connect";
import { logout } from "@/src/application/useCases/User/logout";
import { UserLogSchema } from "@/src/domain/User";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/UserRepositoryImpl";
import { actionClient } from "@/src/lib/safe-action-client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export const Register = actionClient.schema(
    UserLogSchema
).action(async ({parsedInput: input}) => {
    const cookieStore = await cookies();
    let token = await connect(UserRepositoryImpl, input);
    cookieStore.set('login-token', token, {
        httpOnly : true,
        secure: true
    });
    redirect('/app')
})

export const Logout = async() => {
    await logout(UserRepositoryImpl);
    const cookieStore = await cookies();
    cookieStore.delete('login-token')
    redirect('/login')
}