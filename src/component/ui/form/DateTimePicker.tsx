
import { useState } from "react";
import { DatePicker } from "@heroui/date-picker";
import { cn } from "../../utils";
import Label from "./Label";
import { FormError, formError } from "./FormError";
import { DateValue } from "@/src/lib/DateTimePickerUtils";



interface Props {
    label?: string;
    containerClassName?: string;
    errors?: formError | undefined;
    showErrors?: boolean;
    value?: DateValue;
    defaultValue?: DateValue;
    placeholder?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isInvalid?: boolean;
    description?: string;
    granularity?: "day" | "hour" | "minute" | "second";
    hideTimeZone?: boolean;
    hourCycle?: 12 | 24;
    showMonthAndYearPickers?: boolean;
    className?: string;
    /** 
     * Force l'utilisation d'un fuseau horaire spécifique.
     * Par défaut, utilise le fuseau horaire local pour éviter les décalages
     */
    timeZone?: string;
    onChange?: (value: DateValue) => void;
    onBlur?: () => void;
    onFocus?: () => void;
}

export const DateTimePicker = ({
    label = '',
    containerClassName = '',
    errors = undefined,
    showErrors = true,
    value,
    defaultValue,
    isRequired = false,
    isDisabled = false,
    isReadOnly = false,
    isInvalid = false,
    description,
    granularity = "minute",
    hideTimeZone = false,
    hourCycle = 24,
    onChange,
    onBlur,
    onFocus,
    ...props
}: Props) => {
    // Utilise le fuseau horaire local par défaut pour éviter les décalages
    const [internalValue, setInternalValue] = useState<DateValue>(value || defaultValue || null);

    const handleChange = (newValue: DateValue) => {
        setInternalValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className={cn("w-full", containerClassName)}>
            {label && (
                <Label className="mb-2">
                    {label}
                    {isRequired && <span className="text-red-500 ml-1">*</span>}
                </Label>
            )}
            
            <DatePicker
                value={value !== undefined ? value : internalValue}
                onChange={handleChange}
                onBlur={onBlur}
                onFocus={onFocus}
                isRequired={isRequired}
                isDisabled={isDisabled}
                isReadOnly={isReadOnly}
                isInvalid={isInvalid || (errors && showErrors ? true : false)}
                description={description}
                granularity={granularity}
                hideTimeZone={hideTimeZone}
                hourCycle={hourCycle}
                variant="bordered"
                size="md"
                radius="md"
                labelPlacement="outside"
                // Force l'utilisation du fuseau horaire local pour éviter les décalages
                defaultValue={defaultValue}
                classNames={{
                    base: "bg-white shadow-xl rounded-xl calendarContainer group",
                    timeInput: "bg-gray-50",

                }}

                calendarProps={{
                    classNames: {

                        cellButton: [
                            "data-[today=true]:bg-gray-200 rounded-small",
                            "data-[today=true]:data-[selected=true]:bg-primary/50",
                            "data-[today=true]:data-[range-start=true]:bg-primary",
                            "data-[today=true]:data-[selection-start=true]:bg-primary",
                            "data-[today=true]:data-[range-end=true]:bg-primary",
                            "data-[today=true]:data-[selection-end=true]:bg-primary",
                            "data-[selected=true]:bg-primary/50",
                            // start (pseudo)
                            "data-[range-start=true]:bg-primary",
                            "data-[selection-start=true]:bg-primary",
                            // end (pseudo)
                            "data-[range-end=true]:bg-primary",
                            "data-[selection-end=true]:bg-primary",
                        ],
                    },
                }}

                {...props}
            />
            
            {errors && showErrors && <FormError errors={errors} />}
        </div>
    );
};