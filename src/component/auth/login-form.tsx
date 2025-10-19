"use client";

import { useAction } from "next-safe-action/hooks";
import Input from "../ui/form/Input";
import { FormButton } from "../ui/btn/form-button";
import { Register } from "@/src/controller/app/AuthController";


export const LoginForm = () => {

    const val = useAction(Register)
    const { executeAsync, hasErrored, result, input } = useAction(Register)

    return (
        <form 
            action={async (formData) => {
                const email = formData.get('email') as string;
                const password = formData.get('password') as string;
                executeAsync({email, password});
            }}>
            <div className="text-center w-full block font-bold text-2xl mb-3">
                Connexion à mon espace 
            </div>
            <div className="text-center w-full block text-grey-500 mb-5">
                Entrez vos identifiants afin d'accéder à votre compte
            </div>
            <Input 
                errors={result.validationErrors?.email} 
                required 
                type="text" 
                name="email" 
                containerClassName="mb-4" 
                label="Email" 
                id="email" 
            />
            <Input 
                errors={result.validationErrors?.password} 
                required 
                type="password" 
                name="password" 
                containerClassName="mb-4" 
                label="Mot de passe" 
                id="password" 
            />
            <div className="flex justify-center">
                <FormButton type="submit">
                    Se connecter
                </FormButton>
            </div>
            { hasErrored ? <div className="text-red-500">{ result.serverError }</div> : null }
        </form>
    );
}