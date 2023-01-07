import feeds from "./feeds.json";
import {
    useForm,
    useFormContext,
    FormProvider,
    UseFormRegister,
    FieldValues,
} from "react-hook-form";
import { Feeds, Parameters, ParameterItem, ParameterList } from "./RssBridge";
import { useEffect, useState } from "react";

const FEEDS: Feeds = feeds;
const BRIDGES: Feeds["bridges"] = Object.entries(FEEDS.bridges)
    .filter(([_, value]) => value.status === "active")
    .reduce((obj, [bridgeKey, bridge]) => {
        obj[bridgeKey] = FEEDS.bridges[bridgeKey];

        return obj;
    }, {});

console.log(BRIDGES);

// Rough port of form generation from rss-bridge
// https://github.com/RSS-Bridge/rss-bridge/blob/d38bc1823293f0c8e2be07be6e7566b4ed650d72/lib/BridgeCard.php#L338-L349
// https://github.com/RSS-Bridge/rss-bridge/blob/d38bc1823293f0c8e2be07be6e7566b4ed650d72/lib/BridgeCard.php#L62

interface InputProps {
    name: string;
    parameter: ParameterItem;
    register: UseFormRegister<FieldValues>;
}

function Input({ name, parameter, register }: InputProps) {
    return (
        <div key={name}>
            <label>
                {parameter.type === "list" ? (
                    <label>
                        <span className="block">{parameter.name}</span>
                        <select
                            className="bg-gray-700 text-white p-2 my-2 rounded"
                            {...register(name)}
                        >
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
                        <p className="block">
                            {parameter.name}
                            <br />
                            <span className="text-sm text-gray-400">
                                {parameter.title}
                            </span>
                        </p>
                        <input
                            className="bg-gray-700 text-white p-2 my-2 rounded"
                            type={parameter.type || "text"}
                            defaultValue={(
                                parameter.defaultValue || ""
                            ).toString()}
                            required={parameter.required}
                            placeholder={(
                                parameter.exampleValue || ""
                            ).toString()}
                            {...register(name)}
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
    onSubmit: (data: any) => void;
}

interface BridgeFormProps {
    groupName?: string;
    parameters: ParameterList;
    onSubmit: (data: any) => void;
}

function BridgeForm({ groupName, parameters, onSubmit }: BridgeFormProps) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ shouldUnregister: true });

    return (
        <div className="mt-4 bg-gray-800 p-4 rounded">
            {groupName && <h4 className="text-xl font-medium">{groupName}</h4>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                    {Object.entries(parameters as ParameterList).map(
                        ([parameterName, parameter]) => (
                            <Input
                                key={parameterName}
                                name={parameterName}
                                parameter={parameter}
                                register={register}
                            />
                        )
                    )}
                    <button
                        className="bg-blue-500 px-2 py-1 rounded"
                        type="submit"
                    >
                        Add Feed
                    </button>
                </div>
            </form>
        </div>
    );
}

function BridgeParameters({
    parameters,
    isParameter,
    onSubmit,
}: BridgeParametersProps) {
    // Multiple groups of parameters
    if (
        !Array.isArray(parameters) &&
        typeof parameters === "object" &&
        !isParameter
    ) {
        return (
            <>
                {Object.entries(parameters).map(
                    ([groupName, groupParameters]: [string, ParameterList]) =>
                        groupName !== "global" && (
                            <BridgeForm
                                key={groupName}
                                groupName={groupName}
                                parameters={
                                    parameters["global"]
                                        ? {
                                              ...groupParameters,
                                              ...parameters["global"],
                                          }
                                        : groupParameters
                                }
                                onSubmit={onSubmit}
                            />
                        )
                )}
            </>
        );
    }

    // Default group
    if (Array.isArray(parameters) && parameters.length === 1) {
        return <BridgeForm parameters={parameters[0]} onSubmit={onSubmit} />;
    } else if (Array.isArray(parameters) && parameters.length === 0) {
        // Empty array, no parameters
        return null;
    }

    return null;
}

export default function FeedsForm() {
    const [selectedBridgeName, setSelectedBridgeName] = useState<string>(null);

    const selectedBridge = selectedBridgeName
        ? BRIDGES[selectedBridgeName]
        : undefined;

    const onSubmit = (data) => console.log(data);

    return (
        <>
            <select
                className="bg-gray-700 text-white p-2 my-2 rounded"
                onChange={(e) => setSelectedBridgeName(e.target.value)}
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

            {selectedBridge && (
                <div>
                    <h3>
                        <span className="text-2xl font-medium">
                            {selectedBridge.name.replace("Bridge", "")}
                        </span>
                        <span className="text-sm text-gray-400">
                            {" "}
                            ({selectedBridge.uri})
                        </span>
                    </h3>
                    <p>{selectedBridge.description}</p>

                    <BridgeParameters
                        parameters={selectedBridge.parameters}
                        isParameter={false}
                        onSubmit={onSubmit}
                    />
                </div>
            )}
        </>
    );
}
