import SettingInput, { SettingInputProps } from "./SettingInput";

type ToggleInputProps = Omit<SettingInputProps, "render">;

export default function ToggleInput(props: ToggleInputProps) {
    return (
        <SettingInput
            {...props}
            render={({ field }) => (
                <div className="block mt-4 ">
                    <label className="flex mt-2 items-center">
                        <div
                            className={
                                "focus-within:ring-2 \
                                 flex justify-between bg-gray-700 border \
                                 border-gray-600 w-12 h-6 items-center \
                                 rounded-full p-1 duration-300 ease-in-out" +
                                (field.value ? " bg-green-400" : " bg-red-400")
                            }
                        >
                            <input
                                type="checkbox"
                                className="appearance-none bg-white w-4 h-4 rounded-full
                                     shadow-sm transform duration-300 ease-in-out checked:translate-x-5"
                                {...field}
                            />
                        </div>
                        <p className="ml-2">{props.title}</p>
                    </label>
                </div>
            )}
        />
    );
}
