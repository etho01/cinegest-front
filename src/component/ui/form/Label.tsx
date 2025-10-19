import { PropsWithChildren } from "react"


interface Props extends React.ComponentPropsWithRef<'label'>, PropsWithChildren {
    
};


export default function Label({ children, ...props } : Props)
{
    return (
        <label {...props}>
            {children}
        </label>
    )
}