import { utils } from "@rjsf/core";

import { ArrayFieldTemplateProps, IdSchema } from "@rjsf/core";

import AddButton from "./AddButton";
import IconButton from "./IconButton";

const { isMultiSelect, getDefaultRegistry } = utils;

const ArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
    const { schema, registry = getDefaultRegistry() } = props;

    // TODO: update types so we don't have to cast registry as any
    if (isMultiSelect(schema, (registry as any).rootSchema)) {
        return <DefaultFixedArrayFieldTemplate {...props} />;
    } else {
        return <DefaultNormalArrayFieldTemplate {...props} />;
    }
};

type ArrayFieldTitleProps = {
    TitleField: any;
    idSchema: IdSchema;
    title: string;
    required: boolean;
};

const ArrayFieldTitle = ({
    TitleField,
    idSchema,
    title,
    required,
}: ArrayFieldTitleProps) => {
    if (!title) {
        return null;
    }

    const id = `${idSchema.$id}__title`;
    return <TitleField id={id} title={title} required={required} />;
};

type ArrayFieldDescriptionProps = {
    DescriptionField: any;
    idSchema: IdSchema;
    description: string;
};

const ArrayFieldDescription = ({
    DescriptionField,
    idSchema,
    description,
}: ArrayFieldDescriptionProps) => {
    if (!description) {
        return null;
    }

    const id = `${idSchema.$id}__description`;
    return <DescriptionField id={id} description={description} />;
};

// Used in the two templates
const DefaultArrayItem = (props: any) => {
    return (
        <div key={props.key}>
            <div>
                <div>{props.children}</div>
            </div>
            <div className="text-right">
                <IconButton
                    icon="up"
                    className=""
                    disabled={
                        props.disabled || props.readonly || !props.hasMoveUp
                    }
                    onClick={props.onReorderClick(props.index, props.index - 1)}
                />
                <IconButton
                    icon="down"
                    className=""
                    disabled={
                        props.disabled || props.readonly || !props.hasMoveDown
                    }
                    onClick={props.onReorderClick(props.index, props.index + 1)}
                />
                <IconButton
                    icon="remove"
                    className=""
                    disabled={props.disabled || props.readonly}
                    onClick={props.onDropIndexClick(props.index)}
                />
            </div>
        </div>
    );
};

const DefaultFixedArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
    return (
        <fieldset className={props.className}>
            <div
                className="row array-item-list"
                key={`array-item-list-${props.idSchema.$id}`}
            >
                {props.items && props.items.map(DefaultArrayItem)}
            </div>

            {props.canAdd && (
                <span className="float-right">
                    <AddButton
                        className=""
                        onClick={props.onAddClick}
                        disabled={props.disabled || props.readonly}
                    />
                </span>
            )}
        </fieldset>
    );
};

const DefaultNormalArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
    const fieldTitle = props.uiSchema["ui:title"] || props.title;

    return (
        <>
            <ArrayFieldTitle
                key={`array-field-title-${props.idSchema.$id}`}
                TitleField={props.TitleField}
                idSchema={props.idSchema}
                title={fieldTitle}
                required={props.required}
            />
            {(props.uiSchema["ui:description"] || props.schema.description) && (
                <ArrayFieldDescription
                    key={`array-field-description-${props.idSchema.$id}`}
                    DescriptionField={props.DescriptionField}
                    idSchema={props.idSchema}
                    description={
                        props.uiSchema["ui:description"] ||
                        props.schema.description
                    }
                />
            )}

            {props.items && props.items.map((p) => DefaultArrayItem(p))}

            {props.canAdd && (
                <span className="float-right">
                    <AddButton
                        className=""
                        onClick={props.onAddClick}
                        disabled={props.disabled || props.readonly}
                    />
                </span>
            )}
        </>
    );
};

export default ArrayFieldTemplate;
