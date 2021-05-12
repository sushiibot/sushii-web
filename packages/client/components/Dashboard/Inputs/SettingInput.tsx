import { Controller, Control, ControllerProps } from "react-hook-form";

export interface SettingInputProps {
    name: `${string}` | `${string}.${string}` | `${string}.${number}`;
    title: string;
    defaultValue?: unknown;
    control: Control;
    render: ControllerProps["render"];
    rules?: ControllerProps["rules"];
}

export default function SettingInput({
    name,
    control,
    defaultValue,
    render,
    rules,
}: SettingInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={rules}
            render={render}
        />
    );
}
