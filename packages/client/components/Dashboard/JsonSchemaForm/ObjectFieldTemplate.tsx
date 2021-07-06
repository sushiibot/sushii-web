import { ObjectFieldTemplateProps } from "@rjsf/core";

const ObjectFieldTemplate = ({
    DescriptionField,
    description,
    TitleField,
    title,
    properties,
    required,
    uiSchema,
    idSchema,
}: ObjectFieldTemplateProps) => {
    return (
        <>
            {description && (
                <DescriptionField
                    id={`${idSchema.$id}-description`}
                    description={description}
                />
            )}

            <div className="">
                {properties.map((element: any) => element.content)}
            </div>
        </>
    );
};

export default ObjectFieldTemplate;
