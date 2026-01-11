import { LoginForm } from "@/src/component/auth/login-form";
import { GestLayout } from "@/src/component/ui/gest-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Connexion - CineGest",
    description: "Connectez-vous à votre compte CineGest",
};

export default function page()
{
    return (
        <GestLayout>
            <LoginForm />
        </GestLayout>
    )
}