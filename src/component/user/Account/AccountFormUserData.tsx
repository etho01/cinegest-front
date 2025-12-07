
"use client";

import { updateMeController } from "@/src/controller/app/UserController";
import { Input } from "../../ui/form";
import { useAction } from "next-safe-action/hooks";
import { User } from "@/src/domain/User";
import { AccountFormProps } from "./AccountForm";
import { useState } from "react";
import { FormButton } from "../../ui/btn/form-button";

export const AccountFormUserData = ({ user }: AccountFormProps) => {
    const [object, setObject] = useState<User>(user);
    const { executeAsync, hasErrored, result } = useAction(updateMeController);

    return (
        <>
            <form onSubmit={async (e) => {
                e.preventDefault();
                await executeAsync(object);
            }}>
                <div className="text-lg font-semibold mb-4">
                    Informations utilisateur
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                    <Input
                        errors={result.validationErrors?.firstname}
                        label="Prénom"
                        value={object.firstname}
                        onChange={(value) => {
                            setObject({ ...object, firstname: value });
                        }}
                        required
                        containerClassName=""
                    />
                    <Input
                        errors={result.validationErrors?.lastname}
                        label="Nom"
                        value={object.lastname}
                        onChange={(value) => {
                            setObject({ ...object, lastname: value });
                        }}
                        required
                        containerClassName=""
                    />
                    <Input
                        errors={result.validationErrors?.email}
                        label="Email"
                        type="email"
                        value={object.email}
                        onChange={(value) => {
                            setObject({ ...object, email: value });
                        }}
                        required
                        containerClassName=""
                    />
                    <Input
                        errors={result.validationErrors?.phone}
                        label="Téléphone"
                        type="tel"
                        value={object.phone || ""}
                        onChange={(value) => {
                            setObject({ ...object, phone: value });
                        }}
                        containerClassName=""
                    />
                </div>
                <div className="flex justify-end mt-5">
                    <FormButton>
                        Sauvegarder
                    </FormButton>
                </div>
            </form>
            { hasErrored ? <div className="text-red-500">{result.serverError}</div> : null }
        </>
    );
}