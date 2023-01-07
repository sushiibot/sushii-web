import { withTheme, FormProps } from "@rjsf/core";
import type { JSONSchema7 } from "json-schema"

const theme = {
    widgets: {
        test: () => <div>test</div>,
        checkbox: (props) => (
            <label>
                {props.label}
                <input
                    className="ml-2"
                    type="checkbox"
                    required={props.required}
                    value={props.value}
                    onClick={(e) => props.onChange(!props.value)}
                />
            </label>
        ),
    },
    fields: {
        StringField: (props) => (
            <label>
                {props.label}

                <input
                    className="px-2 py-1 bg-gray-700 rounded"
                    type="text"
                    required={props.required}
                    value={props.value}
                    onChange={(e) => props.onChange(e.currentTarget.value)}
                />
            </label>
        ),
    },
};

const JsonForm = withTheme(theme);

export default function Form(props: FormProps<any>) {
    return <JsonForm {...props} />;
}
