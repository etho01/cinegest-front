import { PropsWithChildren } from "react";

interface ReviewCategoryProps extends PropsWithChildren {
    title : string;
}

export const ReviewCategory = ({ title, children } : ReviewCategoryProps) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            {children}
        </div>
    );
}