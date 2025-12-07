import { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
    className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
    return (
        <div className={`bg-white shadow px-0 sm:px-6 py-3 rounded-lg mb-5 mx-auto ${className}`}>
            {children}
        </div>
    );
}
