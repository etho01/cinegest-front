"use server";
import { PasswordReset } from "@/src/domain/User";
import { UserRepository } from "../../repositories/UserRepository";

export const resetPassword = async (repo: UserRepository, reset: PasswordReset): Promise<void> => {
    await repo.resetPassword(reset);
}