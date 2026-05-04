import dynamic from 'next/dynamic';
import { formError, FormError } from './FormError';
import Label from './Label';
import { useEffect, useState } from 'react';

const SelectReact = dynamic(() => import('react-select'), { ssr: false });

interface Option<T> {
    value: T;
    label: string;
}

interface SelectProps<T> {
    className?: string;
    label?: string;
    containerClassName?: string;
    errors?: formError;
    showErrors?: boolean;
    onChange?: (value: T | null, fullValue: Option<T> | null) => void;
    value?: T;
    [key: string]: string | number | boolean | undefined | unknown;
    initialValue?: T;
}

interface SelectPropsWithOptions<T> extends SelectProps<T> {
    options: Array<Option<T>>;
}

export const Select = <T,>({
    className = '', 
    label = '', 
    containerClassName = '', 
    errors = undefined, 
    showErrors = true, 
    options, 
    onChange, 
    value, 
    initialValue, 
    ...props
}: SelectPropsWithOptions<T>) => {
    let htmlFor = "";
    let defaultValue : Option<T> | null = null;
    options.forEach(option => {
        if (option.value === value) {
            defaultValue = option;
        }
    });

    if (initialValue !== undefined) {
        if (typeof initialValue === 'string') {
            defaultValue = options.find(option => option.value === initialValue) || null;
        }
    }

    const [selectedValue, setSelectedValue] = useState<Option<T> | null>(defaultValue);
    if (props['id'] != undefined)
    {
        htmlFor = props['id'] as string
    }

    const execOnChange = (selectedOption: Option<T> | null) => {
        if (onChange) {
            onChange(selectedOption ? selectedOption.value : null, selectedOption);
        }
    }

    const setAndChangeValue = (selectedOption: Option<T> | null) => {
        setSelectedValue(selectedOption);
        execOnChange(selectedOption);
    }

    const onChangeFunction = (selectedOption: unknown) => {
        setAndChangeValue(selectedOption as Option<T> | null);
    }

    useEffect(() => {
        const selectedOption = options.find(option => option.value === value) || null;
        
        setSelectedValue(selectedOption);
    }, [value, options]);
    
    useEffect(() => {
        if (initialValue === undefined) {
            return;
        }
        let selectedOption: Option<T> | null = null;
        if (typeof initialValue === 'string') 
        {
            selectedOption = options.find(option => option.value === initialValue) || null;
        }

        setSelectedValue(selectedOption);
    }, [initialValue, options]);

    return (
        <div className={containerClassName}>
            { label != '' ? <Label htmlFor={htmlFor}>{label}</Label> : '' }
            <SelectReact value={selectedValue} className={className} isMulti={false} options={options} onChange={onChangeFunction} {...props} />
            {errors && showErrors ? <FormError errors={errors} /> : null}
        </div>
    );
}


export const SelectCountry = ({...props} : SelectProps<string>) => {
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

interface SelectMultipleProps<T> {
    className?: string;
    label?: string;
    containerClassName?: string;
    errors?: formError;
    showErrors?: boolean;
    onChange?: (value: T[], fullValue: Option<T>[]) => void;
    value?: T[];
    [key: string]: string | number | boolean | undefined | unknown;
    initialValue?: T[];
}

interface SelectMultiplePropsWithOptions<T> extends SelectMultipleProps<T> {
    options: Array<Option<T>>;
}

export const SelectMultiple = <T,>({
    className = '', 
    label = '', 
    containerClassName = '', 
    errors = undefined, 
    showErrors = true, 
    options, 
    onChange, 
    value, initialValue, 
    ...props
}: SelectMultiplePropsWithOptions<T>) => {
    let htmlFor = "";
    let defaultValue : Option<T>[] = [];
    options.forEach(option => {
        if (Array.isArray(value)) {
            if (value.includes(option.value)) {
                (defaultValue as Array<Option<T>>).push(option);
            }
        }
    });

    if (initialValue !== undefined) {
        if (Array.isArray(initialValue)) {
            defaultValue = options.filter(option => initialValue.includes(option.value));
        }
    }

    const [selectedValue, setSelectedValue] = useState<Option<T>[]>(defaultValue);
    if (props['id'] != undefined)
    {
        htmlFor = props['id'] as string
    }

    const execOnChange = (selectedOption: Option<T>[]) => {
        if (onChange) {
            const values = selectedOption ? selectedOption.map((option: Option<T>) => option.value) : [];
            onChange(values, selectedOption);
        }
    }

    const setAndChangeValue = (selectedOption: Option<T>[]) => {
        setSelectedValue(selectedOption);
        execOnChange(selectedOption);
    }

    const onChangeFunction = (selectedOption: unknown) => {
        console.log('Selected option:', selectedOption);
        setAndChangeValue(selectedOption as Option<T>[]);
    }

    useEffect(() => {
        let selectedOption: Option<T>[] = [];
        if (Array.isArray(value)) 
        {
            selectedOption = options.filter(option => value.includes(option.value));
        }
        
        setSelectedValue(selectedOption);
    }, [value, options]);
    
    useEffect(() => {
        if (initialValue === undefined) {
            return;
        }
        let selectedOption: Option<T>[] = [];
        if (Array.isArray(initialValue)) 
        {
            selectedOption = options.filter(option => initialValue.includes(option.value));
        }

        setSelectedValue(selectedOption);
    }, [initialValue, options]);

    return (
        <div className={containerClassName}>
            { label != '' ? <Label htmlFor={htmlFor}>{label}</Label> : '' }
            <SelectReact value={selectedValue} className={className} isMulti={true} options={options} onChange={onChangeFunction} {...props} />
            {errors && showErrors ? <FormError errors={errors} /> : null}
        </div>
    );
}
