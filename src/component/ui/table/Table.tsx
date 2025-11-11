import { int } from "zod";
import { cn } from "../../utils";

export const Table = ({ className, ...props }: React.ComponentPropsWithRef<'table'>) => {
    return (
        <table className={cn("w-full mt-4", className)} {...props}>
            {/* Table content goes here */}
        </table>
    );
}

export const Thead = ({ className, ...props }: React.ComponentPropsWithRef<'thead'>) => {
    return (
        <thead className={cn("text-gray-400 border-gray-300 border-b-2 text-left", className)} {...props}>
            {/* Table header content goes here */}
        </thead>
    );
};

interface TrProps extends React.ComponentPropsWithRef<'tr'> {
    className?: string;
    index?: number;
}

export const Tr = ({ className, index, ...props }: TrProps) => {
    let classIndex = '';
    if (index !== undefined) {
        classIndex = (index % 2 === 0 ? "hover:bg-gray-300 bg-gray-200" : "hover:bg-gray-100");
    }

    return (
        <tr className={cn(
            className,
            classIndex
        )} {...props}>
            {/* Table row content goes here */}
        </tr>
    );
}

export const Th = ({ className, ...props }: React.ComponentPropsWithRef<'th'>) => {
    return (
        <th className={cn("pb-3", className)} {...props}>
            {/* Table header cell content goes here */}
        </th>
    );
}

export const Td = ({ className, ...props }: React.ComponentPropsWithRef<'td'>) => {
    return (
        <td className={cn('py-2 px-1', className)} {...props}>
            {/* Table data cell content goes here */}
        </td>
    );
}

export const Tbody = ({ className, ...props }: React.ComponentPropsWithRef<'tbody'>) => {
    return (
        <tbody className={cn(className)} {...props}>
            {/* Table body content goes here */}
        </tbody>
    );
};