export default function TextInput({
    className,
    ...props
}: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>) {
    return (
        <input
            className={
                "block focus:outline-none w-64 rounded bg-gray-700 p-2 my-2 " +
                className
            }
            {...props}
        />
    );
}
