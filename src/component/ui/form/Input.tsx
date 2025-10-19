import { PropsWithChildren } from "react";
import { cn } from "../../utils";
import Label from "./Label";
import { FormError, formError } from "./FormError";


interface Props extends 
  React.ComponentPropsWithRef<'input'> {
    label : string,
    containerClassName : string,
    errors : formError | undefined
};

export default function Input({className = '', type, label = '', containerClassName, errors, ...props} : Props)
{
    let htmlFor = "";
    if (props['id'] != undefined)
    {
        htmlFor = props['id']
    }

    return (
        <div className={containerClassName}>
            { label != '' ? <Label htmlFor={htmlFor}>{label}</Label> : '' }
            <input 
                type={type}
                className={cn(
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className
                )}
                {...props}

            />
            {errors ? <FormError errors={errors} /> : null}
        </div>
    )
}