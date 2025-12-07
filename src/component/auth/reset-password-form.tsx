"use client";

import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import Input from "../ui/form/Input";
import { FormButton } from "../ui/btn/form-button";
import { resetPasswordController } from "@/src/controller/app/UserController";
import { PasswordReset } from "@/src/domain/User";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ResetPasswordFormProps {
    token: string;
    email: string;
}

export const ResetPasswordForm = ({ token, email }: ResetPasswordFormProps) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        password: "",
        passwordConfirmation: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { executeAsync, hasErrored, result, isPending } = useAction(resetPasswordController);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const resetData: PasswordReset = {
            email: email,
            token,
            password: formData.password,
            passwordConfirmation: formData.passwordConfirmation
        };
        
        try {
            await executeAsync(resetData);
            setIsSubmitted(true);
            // Rediriger vers la page de connexion après 3 secondes
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } catch (e) {
            throw e;
            // L'erreur est gérée par useAction
        }
    };

    if (isSubmitted && !hasErrored) {
        return (
            <div className="max-w-md mx-auto">
                <div className="text-center w-full block font-bold text-2xl mb-3">
                    Mot de passe modifié
                </div>
                <div className="text-center w-full block text-green-600 mb-5">
                    Votre mot de passe a été modifié avec succès. Vous allez être redirigé vers la page de connexion.
                </div>
                <div className="flex justify-center">
                    <Link href="/login">
                        <FormButton type="button">
                            Se connecter maintenant
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
                    Nouveau mot de passe
                </div>
                <div className="text-center w-full block text-gray-500 mb-5">
                    Choisissez un nouveau mot de passe pour votre compte
                </div>
                
                <Input 
                    errors={result?.validationErrors?.password} 
                    value={formData.password}
                    onChange={(value) => setFormData({ ...formData, password: value })}
                    required 
                    type="password" 
                    name="password" 
                    containerClassName="mb-4" 
                    label="Nouveau mot de passe" 
                    id="password"
                    placeholder="Minimum 8 caractères"
                />
                
                <Input 
                    errors={result?.validationErrors?.passwordConfirmation} 
                    value={formData.passwordConfirmation}
                    onChange={(value) => setFormData({ ...formData, passwordConfirmation: value })}
                    required 
                    type="password" 
                    name="passwordConfirmation" 
                    containerClassName="mb-4" 
                    label="Confirmer le mot de passe" 
                    id="passwordConfirmation"
                    placeholder="Retapez le mot de passe"
                />
                
                <div className="flex justify-center mb-4">
                    <FormButton type="submit" disabled={isPending}>
                        {isPending ? "Modification en cours..." : "Modifier le mot de passe"}
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