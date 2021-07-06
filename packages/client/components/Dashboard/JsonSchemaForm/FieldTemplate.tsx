import React from "react";

import { FieldTemplateProps } from "@rjsf/core";

const FieldTemplate = ({
    id,
    children,
    displayLabel,
    rawErrors = [],
    rawHelp,
    rawDescription,
    label,
    schema,
    required,
}: FieldTemplateProps) => {
    return (
        <fieldset id={id}>
            {children}
            {rawErrors.length > 0 && (
                <ul>
                    {rawErrors.map((error: string) => {
                        return (
                            <li key={error} className="border-0 m-0 p-0">
                                <small className="m-0 text-red-400">
                                    {error}
                                </small>
                            </li>
                        );
                    })}
                </ul>
            )}
            {rawHelp && (
                <p
                    className={
                        "text-sm " +
                        (rawErrors.length > 0
                            ? "text-red-400"
                            : "text-gray-400")
                    }
                >
                    {rawHelp}
                </p>
            )}
        </fieldset>
    );
};

export default FieldTemplate;
