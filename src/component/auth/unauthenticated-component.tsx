"use client";

import { useAction } from "next-safe-action/hooks";
import { FormButton } from "../ui/btn/form-button";
import { Logout } from "@/src/controller/app/AuthController";

export const UnauthenticatedComponent = () => {
    return (
        <form >
            <div className="text-center w-full block font-bold text-2xl mb-3">
                Vous n'etes pas connecter
            </div>
            <div className="flex justify-center">
                <FormButton formAction={Logout} type="submit">
                    Se connecter
                </FormButton>
            </div>
        </form>
    );
}