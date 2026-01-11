import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { AccountForm } from "@/src/component/user/Account/AccountForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mon compte - CineGest",
    description: "Gérez les paramètres de votre compte CineGest",
};

export  default function Compte() {
    return (
        <ShowMenu page="account" entityId={null} cinemaId={null} body={async (user) => {
            return (
                <AccountForm user={user} />
            )
        }} />
    );
}