import { withTheme, FormProps, ThemeProps } from "@rjsf/core";
import ArrayFieldTemplate from "./ArrayFieldTemplate";
import FieldTemplate from "./FieldTemplate";
import ObjectFieldTemplate from "./ObjectFieldTemplate";
import SelectWidget from "./SelectWidget";
import TitleField from "./TitleField";
import TextWidget from "./TextWidget";
import CheckboxWidget from "./CheckboxWidget";

const theme: ThemeProps = {
    ArrayFieldTemplate,
    FieldTemplate,
    ObjectFieldTemplate,
    widgets: {
        SelectWidget,
        TextWidget,
        CheckboxWidget,
    },
    fields: {
        TitleField,
    },
};

const JsonForm = withTheme(theme);

export default function Form(props: FormProps<any>) {
    return <JsonForm {...props} />;
}
