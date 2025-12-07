"use client"
import { updateMePasswordController } from "@/src/controller/app/UserController";
import { AccountFormProps } from "./AccountForm";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { UpdateMePasswordProps } from "@/src/application/useCases/User/updateMePassword";
import { FormButton } from "../../ui/btn/form-button";
import { Input } from "../../ui/form";



export const AccountResetPassword = () => {
    const [object, setObject] = useState<UpdateMePasswordProps>({
        actualPassword: "",
        newPassword: "",
        newPasswordConfirmation: ""
    });
    const { executeAsync, hasErrored, result } = useAction(updateMePasswordController);

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
                        errors={result.validationErrors?.actualPassword}
                        label="Mot de passe actuel"
                        type="password"
                        value={object.actualPassword}
                        onChange={(value) => {
                            setObject({ ...object, actualPassword: value });
                        }}
                        required
                        containerClassName="col-span-2"
                    />
                    <Input
                        errors={result.validationErrors?.newPassword}
                        label="Nouveau mot de passe"
                        type="password"
                        value={object.newPassword}
                        onChange={(value) => {
                            setObject({ ...object, newPassword: value });
                        }}
                        required
                        containerClassName="col-span-2"
                    />
                    <Input
                        errors={result.validationErrors?.newPasswordConfirmation}
                        label="Confirmer le nouveau mot de passe"
                        type="password"
                        value={object.newPasswordConfirmation}
                        onChange={(value) => {
                            setObject({ ...object, newPasswordConfirmation: value });
                        }}
                        required
                        containerClassName="col-span-2"
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