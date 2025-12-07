"use client";

import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import Input from "../ui/form/Input";
import { FormButton } from "../ui/btn/form-button";
import { requestPasswordResetController } from "@/src/controller/app/UserController";
import { PasswordResetRequest } from "@/src/domain/User";
import Link from "next/link";

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { executeAsync, hasErrored, result, isPending } = useAction(requestPasswordResetController);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const request: PasswordResetRequest = { email };
        
        try {
            await executeAsync(request);
            setIsSubmitted(true);
        } catch (e) {
            throw e;
            // L'erreur est gérée par useAction
        }
    };

    if (isSubmitted && !hasErrored) {
        return (
            <div className="max-w-md mx-auto">
                <div className="text-center w-full block font-bold text-2xl mb-3">
                    Email envoyé
                </div>
                <div className="text-center w-full block text-green-600 mb-5">
                    Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation.
                </div>
                <div className="flex justify-center gap-4">
                    <Link href="/login">
                        <FormButton type="button" variant="outline">
                            Retour à la connexion
                        </FormButton>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="text-center w-full block font-bold text-2xl mb-3">
                    Mot de passe oublié
                </div>
                <div className="text-center w-full block text-gray-500 mb-5">
                    Entrez votre adresse email pour recevoir un lien de réinitialisation
                </div>
                
                <Input 
                    errors={result?.validationErrors?.email} 
                    value={email}
                    onChange={setEmail}
                    required 
                    type="email" 
                    name="email" 
                    containerClassName="mb-4" 
                    label="Adresse email" 
                    id="email"
                    placeholder="votre.email@exemple.com"
                />
                
                <div className="flex justify-center mb-4">
                    <FormButton type="submit" disabled={isPending}>
                        {isPending ? "Envoi en cours..." : "Envoyer le lien"}
                    </FormButton>
                </div>
                
                {hasErrored && (
                    <div className="text-red-500 text-center mb-4">
                        {result?.serverError || "Une erreur est survenue"}
                    </div>
                )}
                
                <div className="text-center">
                    <Link href="/login" className="text-blue-600 hover:text-blue-800 text-sm">
                        ← Retour à la connexion
                    </Link>
                </div>
            </form>
        </div>
    );
};