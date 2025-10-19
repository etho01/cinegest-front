
export type formError = {
    _errors?: String[] | undefined
}

interface Props {
    errors : formError | undefined
}

export const FormError = ({errors}: Props) => {
    return (
        <>
            {errors ?
                <ul>
                    {errors._errors?.map((error, index) => <li className="text-red-500" key={index}>{error}</li>)}
                </ul>
            : null}
        </>
    )
}