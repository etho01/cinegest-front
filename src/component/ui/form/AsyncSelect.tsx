import dynamic from "next/dynamic";
import type { ActionMeta } from "react-select";
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
    onChange?: (fullValue: Option<T>) => void;
    isMulti?: boolean;
    [key: string]: any;
    loadOptions : (inputValue: string, callback: (options: Option<T>[]) => void) => void | Promise<Option<T>[]>;
}

export const AsyncSelect = <T,>({className = '', label = '', containerClassName = '', errors = undefined, showErrors = true, onChange, isMulti = false, loadOptions, ...props}: SelectProps<T>) => {
    let htmlFor = "";
    if (props['id'] != undefined)
    {
        htmlFor = props['id']
    }

    const handleChange = (newValue: unknown, _actionMeta: ActionMeta<unknown>) => {
        if (onChange) {
            const option = newValue as Option<T> | null;
            onChange(option as Option<T>);
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