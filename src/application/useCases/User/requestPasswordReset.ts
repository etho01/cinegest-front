"use server";
import { PasswordResetRequest } from "@/src/domain/User";
import { UserRepository } from "../../repositories/UserRepository";

export const requestPasswordReset = async (repo: UserRepository, request: PasswordResetRequest): Promise<void> => {
    await repo.requestPasswordReset(request);
}