
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                value={(value ?? internalValue) as any}
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                defaultValue={defaultValue as any}
                classNames={{
                    base: "bg-white shadow-xl rounded-xl calendarContainer group",
                    timeInput: "bg-gray-50",
                }}
                calendarProps={{
                    classNames: {
                        base: "bg-white",
                        content: "bg-white",
                        gridHeader: "bg-white shadow-none",
                        gridHeaderRow: "bg-white",
                        gridHeaderCell: "text-gray-600",
                        gridBody: "bg-white",
                        gridBodyRow: "bg-white first:border-t-0",
                        cellButton: [
                            "bg-white hover:bg-gray-100",
                            "data-[today=true]:bg-gray-200",
                            "data-[selected=true]:bg-primary data-[selected=true]:text-white",
                            "data-[disabled=true]:opacity-30",
                        ],
                    },
                }}
            />
            
            {errors && showErrors && <FormError errors={errors} />}
        </div>
    );
};