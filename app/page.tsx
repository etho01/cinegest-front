import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CineGest - Gestion de cinéma",
    description: "Application de gestion de cinéma",
};

export default function Home() {

    redirect('/app');
    return (
        <div>
            
        </div>
    );
}
