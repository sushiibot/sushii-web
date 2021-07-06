import TextInput from "./TextInput";

export default function TextInputWithLabel({
    className,
    ...props
}: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>) {
    return (
        <label className="block">
            {props.title}
            <TextInput {...props} />
        </label>
    );
}
