import { createSafeActionClient } from "next-safe-action";
import "./zod-i18n";
import { CustomError } from "../domain/global";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const actionClient = createSafeActionClient({
    handleServerError: (error) => {
        if (isRedirectError(error)) {
            throw error;
        }

        if (error instanceof CustomError) {
            return error.message;
        }

        return 'Une erreur est survenue. Veuillez réessayer plus tard.';
    }
});