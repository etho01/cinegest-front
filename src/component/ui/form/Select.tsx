import dynamic from 'next/dynamic';
import { formError, FormError } from './FormError';
import Label from './Label';
import { useEffect, useState } from 'react';

const SelectReact = dynamic(() => import('react-select'), { ssr: false });

interface SelectProps {
    className?: string;
    label?: string;
    containerClassName?: string;
    errors?: formError;
    showErrors?: boolean;
    onChange?: (value: any, fullValue: any) => void;
    value?: any;
    isMulti?: boolean;
    [key: string]: any;
    initialValue?: string[] | string;
}

interface SelectPropsWithOptions extends SelectProps {
    options: Array<{ value: string | number; label: string }>;
}

export const Select = ( {className = '', label = '', containerClassName = '', errors = undefined, showErrors = true, options, onChange, value, initialValue, isMulti = false, ...props}: SelectPropsWithOptions) => {
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

    if (initialValue !== undefined) {
        if (isMulti && Array.isArray(initialValue)) {
            defaultValue = options.filter(option => initialValue.includes(option.value + ''));
        } else if (!isMulti && typeof initialValue === 'string') {
            defaultValue = options.find(option => option.value === initialValue) || null;
        }
    }

    const [selectedValue, setSelectedValue] = useState<any>(defaultValue);
    if (props['id'] != undefined)
    {
        htmlFor = props['id']
    }

    const execOnChange = (selectedOption: any) => {
        if (onChange) {
            if (isMulti) {
                const values = selectedOption ? selectedOption.map((option: any) => option.value) : [];
                onChange(values, selectedOption);
                return;
            }
            onChange(selectedOption ? selectedOption.value : null, selectedOption);
        }
    }

    const setAndChangeValue = (selectedOption: any) => {
        setSelectedValue(selectedOption);
        execOnChange(selectedOption);
    }

    const onChangeFunction = (selectedOption: any) => {
        setAndChangeValue(selectedOption);
    }

    useEffect(() => {
        let selectedOption: any = null;
        if (isMulti && Array.isArray(value)) 
        {
            selectedOption = options.filter(option => value.includes(option.value));
        }
        else if (!isMulti) 
        {
            selectedOption = options.find(option => option.value === value) || null;
        }
        
        setSelectedValue(selectedOption);
    }, [value]);
    
    useEffect(() => {
        if (initialValue === undefined) {
            return;
        }
        let selectedOption: any = null;
        if (isMulti && Array.isArray(initialValue)) 
        {
            selectedOption = options.filter(option => initialValue.includes(option.value + ''));
        }
        else if (!isMulti && typeof initialValue === 'string') 
        {
            selectedOption = options.find(option => option.value === initialValue) || null;
        }

        setSelectedValue(selectedOption);
    }, [initialValue]);

    return (
        <div className={containerClassName}>
            { label != '' ? <Label htmlFor={htmlFor}>{label}</Label> : '' }
            <SelectReact value={selectedValue} className={className} isMulti={isMulti} options={options} onChange={onChangeFunction} {...props} />
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