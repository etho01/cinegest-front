import {  useState } from "react";
import { cn } from "../../utils";
import Label from "./Label";
import { FormError, formError } from "./FormError";


interface Props extends 
  Omit<React.ComponentPropsWithRef<'textarea'>, 'onChange'> {
    label : string,
    containerClassName? : string,
    errors? : formError | undefined
    showErrors?: boolean
    initialValue?: string
    onChange?: (value: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void
};

export default function Textarea({className = '', label = '', containerClassName = '', errors = undefined, showErrors = true, initialValue = '', onChange, ...props} : Props)
{
    const [value, setValue] = useState(initialValue);

    let htmlFor = "";
    if (props['id'] != undefined)
    {
        htmlFor = props['id']
    }

    return (
        <div className={containerClassName}>
            { label != '' ? <Label htmlFor={htmlFor}>{label}</Label> : '' }
            <textarea 
                onChange={(e) => {
                    setValue(e.target.value);
                    if (onChange) onChange(e.target.value, e);
                }}
                className={cn(
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className
                )}
                {...props}

            >
                {value}
            </textarea>
            {errors && showErrors ? <FormError errors={errors} /> : null}
        </div>
    )
}