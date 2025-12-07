import { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren) {
    return (
        <div className="bg-white shadow px-0 sm:px-6 py-3 rounded-lg mb-5 mx-auto">
            {children}
        </div>
    );
}
