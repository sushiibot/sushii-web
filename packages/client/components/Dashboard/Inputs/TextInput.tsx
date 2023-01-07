import SettingInput, { SettingInputProps } from "./SettingInput";

type TextInputProps = Omit<SettingInputProps, "render">;

export default function TextInput(props: TextInputProps) {
    return (
        <SettingInput
            {...props}
            render={({ field, fieldState: { error } }) => (
                <>
                    <label className="block">
                        {props.title}
                        <div
                            className={
                                "mt-2 focus-within:ring-2 \
                                 flex justify-between bg-gray-700 border \
                                 border-gray-600 text-white rounded" +
                                (error
                                    ? " border-red-400"
                                    : field.value !== props.defaultValue
                                    ? " border-blue-500"
                                    : "")
                            }
                        >
                            <input
                                className="focus:outline-none
                                           rounded-l bg-gray-700 p-2"
                                {...field}
                            />
                            <button
                                className="h-full p-2 px-4 bg-blue-500 rounded-r
                                    border-l border-gray-600
                                    disabled:bg-gray-700 disabled:text-gray-500
                                    disabled:cursor-default"
                                disabled={
                                    field.value === props.defaultValue ||
                                    !!error
                                }
                            >
                                Save
                            </button>
                        </div>
                    </label>
                    {error && (
                        <span className="block text-red-300">
                            {error.message}
                        </span>
                    )}
                </>
            )}
        />
    );
}
