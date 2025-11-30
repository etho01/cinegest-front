import { cva, VariantProps } from "class-variance-authority";

export const StatusVariants = cva(
    'font-semibold',
    {
        variants: {
            variant: {
                success: 'text-green-600',
                danger: 'text-red-600',
                warning: 'text-yellow-600',
                primary: 'text-primary',
                secondary: 'text-secondary',
                other : '',
            },
        },
        defaultVariants: {
            variant: 'success',
        },
    }
);

interface StatusItemProps extends VariantProps<typeof StatusVariants> {
    status: string;
    className?: string;
}

export const StatusItem = ({status, variant, className}: StatusItemProps) => {
    return (
        <div className={StatusVariants({ variant, className })}>
            {status}
        </div>
    );
}