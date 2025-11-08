import dynamic from 'next/dynamic';
import { formError, FormError } from './FormError';
import Label from './Label';
import { useState } from 'react';

const SelectReact = dynamic(() => import('react-select'), { ssr: false });

interface SelectProps {
    className?: string;
    type?: string;
    label?: string;
    containerClassName?: string;
    errors?: formError;
    showErrors?: boolean;
    onChange?: (value: any, fullValue: any) => void;
    value?: any;
    isMulti?: boolean;
    [key: string]: any;
}

interface SelectPropsWithOptions extends SelectProps {
    options: Array<{ value: string | number; label: string }>;
}

export const Select = ( {className = '', type, label = '', containerClassName = '', errors = undefined, showErrors = true, options, onChange, value, isMulti = false, ...props}: SelectPropsWithOptions) => {
    let htmlFor = "";
    let defaultValue : any = isMulti ? [] : null;
    options.forEach(option => {
        if (isMulti && Array.isArray(value)) {
            if (value.includes(option.value)) {
                (defaultValue as Array<any>).push(option);
            }
        } else {
            if (option.value === value) {
                defaultValue = option;
            }
        }
    });

    const [selectedValue, setSelectedValue] = useState<any>(defaultValue);
    if (props['id'] != undefined)
    {
        htmlFor = props['id']
    }

    const onChangeFunction = (selectedOption: any) => {
        setSelectedValue(selectedOption);
        if (onChange) {
            if (isMulti) {
                const values = selectedOption ? selectedOption.map((option: any) => option.value) : [];
                onChange(values, selectedOption);
                return;
            }
            onChange(selectedOption ? selectedOption.value : null, selectedOption);
        }
    }
    
    return (
        <div className={containerClassName}>
            { label != '' ? <Label htmlFor={htmlFor}>{label}</Label> : '' }
            <SelectReact value={selectedValue} isMulti={isMulti} options={options} onChange={onChangeFunction} {...props} />
            {errors && showErrors ? <FormError errors={errors} /> : null}
        </div>
    );
}


export const SelectCountry = ({...props} : SelectProps) => {
    return (
        <Select 
            options={[
                { value: 'FR', label: 'France' },
                { value: 'US', label: 'United States' },
                { value: 'GB', label: 'United Kingdom' },
                { value: 'DE', label: 'Germany' },
                { value: 'IT', label: 'Italy' },
                { value: 'ES', label: 'Spain' },
            ]}
            {...props}
        />
    )
}