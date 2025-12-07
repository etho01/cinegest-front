import { ResetPasswordForm } from "@/src/component/auth/reset-password-form";
import { GestLayout } from "@/src/component/ui/gest-layout";
import { redirect } from "next/navigation";

interface ResetPasswordPageProps {
    searchParams: Promise<{ token?: string, email?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
    const resolvedParams = await searchParams;
    const { token, email } = resolvedParams;

    // Rediriger vers la page de mot de passe oublié si pas de token
    if (!token || !email) {
        redirect("/forgot-password");
    }

    return (
        <GestLayout>
            <ResetPasswordForm token={token} email={email} />
        </GestLayout>
    );
}