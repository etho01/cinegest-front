"use client";

import { useAction } from "next-safe-action/hooks";
import Input from "../ui/form/Input";
import { FormButton } from "../ui/btn/form-button";
import { Register } from "@/src/controller/app/AuthController";
import Link from "next/link";
import { useRouter } from "next/navigation";


export const LoginForm = () => {

    const router = useRouter();
    const { executeAsync, hasErrored, result } = useAction(Register)

    return (
        <form 
            action={async (formData) => {
                const email = formData.get('email') as string;
                const password = formData.get('password') as string;
                const result = await executeAsync({email, password});
                if (result?.data?.success) {
                    router.push('/app');
                }
            }}>
            <div className="text-center w-full block font-bold text-2xl mb-3">
                Connexion à mon espace 
            </div>
            <div className="text-center w-full block text-grey-500 mb-5">
                Entrez vos identifiants afin d&apos;accéder à votre compte
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
            
            <div className="text-center mt-4">
                <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800 text-sm">
                    Mot de passe oublié ?
                </Link>
            </div>
            
            { hasErrored ? <div className="text-red-500 mt-4 text-center">{ result.serverError }</div> : null }
        </form>
    );
}