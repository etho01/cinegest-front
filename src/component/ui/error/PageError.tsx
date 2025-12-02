

export const PageError = ({error}: {error: Error}) => {
    return (
        <form >
            <div className="text-center w-full block font-bold mb-3">
                {error.message}
            </div>
        </form>
    )
}