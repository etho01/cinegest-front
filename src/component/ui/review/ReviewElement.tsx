import { PropsWithChildren } from "react";
import { cn } from "../../utils";
import { Button } from "../btn/button";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ReviewElementProps extends PropsWithChildren {
    title: string;
    containerClassName?: string;
    titleClassName?: string;
    childrenClassName?: string;
    updateFunction?: () => void;
    showUpdate?: boolean;
}

export const ReviewElement = ({ title, children, containerClassName = "", titleClassName = "", childrenClassName = "", updateFunction, showUpdate = true }: ReviewElementProps) => {
    return (
        <div className={cn("flex justify-between", containerClassName)}>
            <div >
                <div className={cn("font-semibold mb-1", titleClassName)}>
                    {title}
                </div>
                <div className={cn(childrenClassName)}>
                    {children}
                </div>
            </div>
            {(updateFunction && showUpdate) && 
                <div className="my-auto">
                    <Button
                        variant="default"
                        size="sm"
                        className="ml-4"
                        onClick={() => {
                            updateFunction();
                        }}
                    >
                        <FontAwesomeIcon icon={faPenSquare} />
                    </Button>
                </div>
            }

        </div>

    );
}