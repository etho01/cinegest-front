import { createSafeActionClient } from "next-safe-action";
import "./zod-i18n";
import { CustomError } from "../domain/global";

export const actionClient = createSafeActionClient({
    handleServerError: (error) => {
        if (error instanceof CustomError) {
            return error.message;
        }

        return 'Une erreur est survenue. Veuillez réessayer plus tard.';
    }
});