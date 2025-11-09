"use client";

import { Button, ButtonProps } from "./button";

export const FormButton = ({variant, children, type, ...props} : ButtonProps) => 
{
    return (
        <Button type="submit" variant={variant} {...props}>
            {children}
        </Button>
    )
}