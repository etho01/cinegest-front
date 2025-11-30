import dynamic from "next/dynamic";
import { FormError, formError } from "./FormError";
import Label from "./Label";

const SelectAsyncReact = dynamic(() => import('react-select/async'), { ssr: false });

interface SelectProps {
    className?: string;
    label?: string;
    containerClassName?: string;
    errors?: formError;
    showErrors?: boolean;
    onChange?: (value: any, fullValue: any) => void;
    isMulti?: boolean;
    [key: string]: any;
    loadOptions : (inputValue: string, callback: (options: any[]) => void) => void | Promise<any[]>;
}

export const AsyncSelect = ({className = '', label = '', containerClassName = '', errors = undefined, showErrors = true, onChange, isMulti = false, loadOptions, ...props}: SelectProps) => {
    let htmlFor = "";
    if (props['id'] != undefined)
    {
        htmlFor = props['id']
    }

    return (
        <div className={containerClassName}>
            { label != '' ? <Label htmlFor={htmlFor}>{label}</Label> : '' }
            <SelectAsyncReact
                className={className} 
                isMulti={isMulti} 
                onChange={onChange} 
                {...props} 
                loadOptions={loadOptions}
            />
            {errors && showErrors ? <FormError errors={errors} /> : null}
        </div>
    );
};