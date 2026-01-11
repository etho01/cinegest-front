import { ForgotPasswordForm } from "@/src/component/auth/forgot-password-form";
import { GestLayout } from "@/src/component/ui/gest-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mot de passe oublié - CineGest",
    description: "Réinitialisez votre mot de passe CineGest",
};

export default function ForgotPasswordPage() {
    return (
        <GestLayout>
            <ForgotPasswordForm />
        </GestLayout>
    );
}