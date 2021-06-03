import feeds from "./feeds.json";
import { useForm } from "react-hook-form";
import { Feeds, Parameters, ParameterItem, ParameterList } from "./RssBridge";

const FEEDS: Feeds = feeds;
const BRIDGES: Feeds["bridges"] = Object.entries(FEEDS.bridges)
    .filter(([_, value]) => value.status === "active")
    .reduce((obj, [bridgeKey, bridge]) => {
        obj[bridgeKey] = FEEDS.bridges[bridgeKey];

        return obj;
    }, {});

console.log(BRIDGES);

interface InputProps {
    name: string;
    parameter: ParameterItem;
}

function Input({ name, parameter }: InputProps) {
    return (
        <div key={name}>
            <label>
                {parameter.type === "list" ? (
                    <label>
                        <span className="block">{parameter.name}</span>
                        <select className="bg-gray-700 text-white p-2 my-2">
                            {Object.entries(parameter.values).map(
                                ([valueDisplay, value]) =>
                                    typeof value === "object" ? (
                                        <optgroup>
                                            {Object.entries(value).map(
                                                ([valueDisplay, value]) => (
                                                    <option
                                                        key={value.toString()}
                                                        value={value.toString()}
                                                        className="bg-gray-700 text-white"
                                                    >
                                                        {valueDisplay}
                                                    </option>
                                                )
                                            )}
                                        </optgroup>
                                    ) : (
                                        <option
                                            key={value.toString()}
                                            value={value.toString()}
                                            className="bg-gray-700 text-white"
                                        >
                                            {valueDisplay}
                                        </option>
                                    )
                            )}
                        </select>
                    </label>
                ) : (
                    <label>
                        <span className="block">{parameter.name}</span>
                        <input
                            className="bg-gray-700 text-white p-2 my-2"
                            type={parameter.type || "text"}
                            defaultValue={(
                                parameter.defaultValue || ""
                            ).toString()}
                            required={parameter.required}
                        />
                    </label>
                )}
            </label>
        </div>
    );
}

interface BridgeParametersProps {
    parameters: Parameters | ParameterList | ParameterItem;
    // If this is **not** a group. Group and parameters are both objects with
    // arbitrary keys, so just the 2nd layer is parameters.
    isParameter: boolean;
}

function BridgeParameters({ parameters, isParameter }: BridgeParametersProps) {
    console.log(parameters, isParameter);
    console.log(
        !Array.isArray(parameters) &&
            typeof parameters === "object" &&
            !isParameter
    );

    // Multiple groups of parameters
    if (
        !Array.isArray(parameters) &&
        typeof parameters === "object" &&
        !isParameter
    ) {
        return (
            <>
                {Object.entries(parameters).map(
                    ([groupName, parameters]: [string, ParameterList]) => (
                        <div key={groupName} className="mt-4">
                            <h4 className="text-xl font-medium">{groupName}</h4>
                            <BridgeParameters
                                parameters={parameters}
                                isParameter={true}
                            />
                        </div>
                    )
                )}
            </>
        );
    }

    // Default group
    if (Array.isArray(parameters) && parameters.length === 1) {
        return (
            <BridgeParameters parameters={parameters[0]} isParameter={true} />
        );
    } else if (Array.isArray(parameters) && parameters.length === 0) {
        // Empty array, no parameters
        return null;
    }

    // Actual parameters for a single group
    return (
        <>
            {Object.entries(parameters as ParameterList).map(
                ([parameterName, parameter]) => (
                    <Input name={parameterName} parameter={parameter} />
                )
            )}
        </>
    );
}

export default function FeedsForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const watchBridgeName = watch("bridgeName");
    const watchBridge = watchBridgeName ? BRIDGES[watchBridgeName] : undefined;

    const onSubmit = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <select
                {...register("bridgeName")}
                className="bg-gray-700 text-white"
            >
                {Object.entries(BRIDGES).map(([bridgeKey, bridge]) => (
                    <option
                        key={bridgeKey}
                        value={bridgeKey}
                        className="bg-gray-700 text-white"
                    >
                        {bridge.name.replace("Bridge", "")}
                    </option>
                ))}
            </select>

            {watchBridge && (
                <div>
                    <h3>{watchBridge.name}</h3>
                    <p>{watchBridge.uri}</p>
                    <p>{watchBridge.description}</p>

                    <BridgeParameters
                        parameters={watchBridge.parameters}
                        isParameter={false}
                    />
                </div>
            )}
        </form>
    );
}
