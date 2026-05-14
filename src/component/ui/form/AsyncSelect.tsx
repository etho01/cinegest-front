import dynamic from "next/dynamic";
import { FormError, formError } from "./FormError";
import Label from "./Label";

const SelectAsyncReact = dynamic(() => import('react-select/async'), { ssr: false });

export interface Option<T> {
    value: T;
    label: string;
}

interface SelectProps<T> {
    className?: string;
    label?: string;
    containerClassName?: string;
    errors?: formError;
    showErrors?: boolean;
    onChange?: (fullValue: Option<T> | null) => void;
    isMulti?: boolean;
    [key: string]: unknown | undefined | string;
    loadOptions : (inputValue: string, callback: (options: Option<T>[]) => void) => void | Promise<Option<T>[]>;
}

export const AsyncSelect = <T,>({className = '', label = '', containerClassName = '', errors = undefined, showErrors = true, onChange, isMulti = false, loadOptions, ...props}: SelectProps<T>) => {
    let htmlFor = "";
    if (props['id'] != undefined)
    {
        htmlFor = props['id'] as string
    }

    const handleChange = (newValue: unknown) => {
        if (onChange) {
            const option = newValue as Option<T> | null;
            onChange(option);
        }
    }

    return (
        <div className={containerClassName}>
            { label != '' ? <Label htmlFor={htmlFor}>{label}</Label> : '' }
            <SelectAsyncReact
                className={className} 
                isMulti={isMulti} 
                onChange={handleChange} 
                {...props} 
                loadOptions={loadOptions}
            />
            {errors && showErrors ? <FormError errors={errors} /> : null}
        </div>
    );
};