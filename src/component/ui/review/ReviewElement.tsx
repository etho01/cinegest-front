import { PropsWithChildren } from "react";
import { Props } from "react-select";
import { cn } from "../../utils";

interface ReviewElementProps extends PropsWithChildren {
    title: string;
    containerClassName?: string;
    titleClassName?: string;
    childrenClassName?: string;
}

export const ReviewElement = ({ title, children, containerClassName = "", titleClassName = "", childrenClassName = "" }: ReviewElementProps) => {
    return (
        <div className={containerClassName}>
            <div className={cn("font-semibold mb-1", titleClassName)}>
                {title}
            </div>
            <div className={cn(childrenClassName)}>
                {children}
            </div>
        </div>
    );
}