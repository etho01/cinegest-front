import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import Link from 'next/link';


export const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'cursor-pointer bg-primary text-white hover:bg-primary/90',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline:
                    'cursor-pointer border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
                disabled : '',
                remove : 'cursor-pointer bg-red-600 text-white hover:bg-red-700',
            },
            size: {
                default: ' px-4 py-2',
                sm: ' rounded-md px-1 py-1',
                lg: ' rounded-md px-8',
                icon: ' w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends
    React.ComponentPropsWithRef<'button'>,
    VariantProps<typeof buttonVariants> {
}

export const Button = ({ variant, size, className, children, ref, ...props }: ButtonProps) => {

    return (
        <button
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    )
};

interface LinkButtonProps
    extends
    React.ComponentPropsWithRef<typeof Link>,
    VariantProps<typeof buttonVariants> {
}

export const LinkButton = ({ variant, size, className, children, ...props }: LinkButtonProps) => {
    return (
        <Link
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        >
            {children}
        </Link>
    )
};