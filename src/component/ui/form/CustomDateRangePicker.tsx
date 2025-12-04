import { useState } from "react";
import { formError, FormError } from "./FormError";
import Label from "./Label";
import {DateRangePicker, DateRangePickerProps} from "@heroui/date-picker";
import { cn } from "../../utils";
import {parseAbsoluteToLocal, ZonedDateTime} from "@internationalized/date";
import {RangeValue} from "@react-types/shared";

interface CustomDateRangePickerProps
extends Omit<DateRangePickerProps, 'label' | 'containerClassName' | 'errors' | 'showErrors' | 'initialValue' | 'onChange'>
{
    label : string,
    containerClassName? : string,
    errors? : formError | undefined
    showErrors?: boolean
    initialValue?: string
    onChange?: (dateEnd: Date | null, dateStart: Date | null) => void
    dateStart?: string,
    dateEnd?: string
}

export const CustomDateRangePicker = ({className = '', label = '', containerClassName = '', errors = undefined, showErrors = true, initialValue = '', onChange, ...props} : CustomDateRangePickerProps) => {
    const [value, setValue] = useState(initialValue);

    let htmlFor = "";
    if (props['id'] != undefined)
    {
        htmlFor = props['id']
    }

    const parseDate = (dateString: string | null) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return parseAbsoluteToLocal(date.toISOString());
    }

    const onChangeInternal = (newValue: RangeValue<ZonedDateTime> | null) => {
        if (newValue == null)
        {
            if (onChange)
            {
                onChange(null, null);
            }
        }
        else
        {
            const start = newValue.start ? new Date(newValue.start.toString()) : null;
            const end = newValue.end ? new Date(newValue.end.toString()) : null;

            if (onChange)
            {
                onChange(end, start);
            }
        }
    }

    const startDate = parseDate(props.dateStart ? props.dateStart : null);
    const endDate = parseDate(props.dateEnd ? props.dateEnd : null);

    return (
        <div className={containerClassName}>
            { label != '' ? <Label htmlFor={htmlFor}>{label}</Label> : '' }
            <DateRangePicker
                value={startDate && endDate ? {
                    start: startDate,
                    end: endDate
                } : undefined}
                classNames={{
                    calendar: "bg-white shadow-xl rounded-xl calendarContainer group",
                    timeInput: "bg-gray-50",
                    separator: "mx-2 text-gray-500",

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
                variant="bordered"
                
                onChange={onChangeInternal}
                className={cn(
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className
                )}
            />
            {errors && showErrors ? <FormError errors={errors} /> : null}
        </div>
    );
};