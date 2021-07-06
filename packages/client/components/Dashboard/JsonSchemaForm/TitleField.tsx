import { FieldProps } from "@rjsf/core";

export interface TitleFieldProps extends Partial<FieldProps> {
    title: string;
}

const TitleField = ({ title }: Partial<FieldProps>) => (
    <>
        <div className="my-1">
            <h5 className="text-lg">{title}</h5>
            <hr className="border border-gray-500" />
        </div>
    </>
);

export default TitleField;
