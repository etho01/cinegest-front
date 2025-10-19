"use client";

import { Button, ButtonProps } from "./button";

export const FormButton = ({variant, children, ...props} : ButtonProps) => 
{
    

    return (
        <Button variant={variant} {...props}>
            {children}
        </Button>
    )
}