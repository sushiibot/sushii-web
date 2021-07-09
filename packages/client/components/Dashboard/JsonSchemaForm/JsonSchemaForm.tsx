import { withTheme, FormProps, ThemeProps } from "@rjsf/core";
import ArrayFieldTemplate from "./ArrayFieldTemplate";
import FieldTemplate from "./FieldTemplate";
import ObjectFieldTemplate from "./ObjectFieldTemplate";
import SelectWidget from "./SelectWidget";
import TitleField from "./TitleField";
import DescriptionField from "./DescriptionField";
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
        DescriptionField,
    },
};

const customFormats = {
    uint64: (num) => parseInt(num, 10) >= 0,
    uint: (num) => parseInt(num, 10) >= 0,
};

const JsonForm = withTheme(theme);

export default function Form(props: FormProps<any>) {
    return <JsonForm {...props} customFormats={customFormats} />;
}
