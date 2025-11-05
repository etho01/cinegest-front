import dynamic from 'next/dynamic';
import { FormError } from './FormError';
import Label from './Label';
const SelectReact = dynamic(() => import('react-select'), { ssr: false });


const Select = ( {className = '', type, label = '', containerClassName = '', errors = undefined, showErrors = true, ...props}: any) => {
    let htmlFor = "";
    if (props['id'] != undefined)
    {
        htmlFor = props['id']
    }
    
    return (
        <div className={containerClassName}>
            { label != '' ? <Label htmlFor={htmlFor}>{label}</Label> : '' }
            <SelectReact {...props} />
            {errors && showErrors ? <FormError errors={errors} /> : null}
        </div>
    );
}

export default Select;
