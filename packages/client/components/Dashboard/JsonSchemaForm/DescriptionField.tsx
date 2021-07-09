import { FieldProps } from "@rjsf/core";

export default function TitleField({ description }: FieldProps) {
    if (!description) {
        return null;
    }

    return (
        <>
            <div className="my-1">
                <p className="text-sm text-gray-400">{description}</p>
            </div>
        </>
    );
}
