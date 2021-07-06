import { AddButtonProps } from "@rjsf/core";

import { PlusCircleIcon } from "@heroicons/react/outline";

const AddButton = (props: AddButtonProps) => (
    <button
        className={"px-2 py-1 bg-blue-500 rounded " + props.className}
        onClick={(e) => props.onClick(e as any)}
        disabled={props.disabled}
    >
        <PlusCircleIcon className="w-6 h-6 mr-1 inline align-middle" />
        <span className="align-middle">Add Item</span>
    </button>
);

export default AddButton;
