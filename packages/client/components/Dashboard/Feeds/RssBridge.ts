export interface Feeds {
    bridges: { [bridgeName: string]: Bridge };
}

export type Status = "active" | "inactive";

export interface Bridge {
    status: Status;
    uri: string;
    name: string;
    description: string;
    icon: string;
    parameters: Parameters;
    maintainer: string;
}

export type ParameterType = "list" | "number" | "checkbox" | "text";

// Either a group with multiple sub-"pages" or an array of len 1 with all the params
export type Parameters = ParameterGroups | ParameterList[] | [];

// If it's an object, then there are multiple sub-"pages"
export interface ParameterGroups {
    [groupName: string]: ParameterList | [];
    // Global parameters that should be merged with each group above
    global?: ParameterList;
}

// A list of parameters in a given group
export type ParameterList = { [paramName: string]: ParameterItem } | [];

export interface ParameterItem {
    name: string;
    title?: string;
    description?: string;
    required?: boolean;
    type?: ParameterType;
    exampleValue?: string | number | boolean;
    defaultValue?: string | number | boolean;
    // Regex pattern to validate input
    pattern?: string;
    // If type is a list, values of the list
    values?: ParameterItemValuesGroup;
}

// Values can be a nested value for groups within the dropdown list
export interface ParameterItemValues {
    [key: string]: string | number | boolean;
}

export interface ParameterItemValuesGroup {
    [key: string]: ParameterItemValues | string | number | boolean;
}
