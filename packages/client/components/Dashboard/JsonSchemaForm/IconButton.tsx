import { AddButtonProps } from "@rjsf/core";
import {
    TrashIcon,
    ArrowDownIcon,
    ArrowUpIcon,
} from "@heroicons/react/outline";

const mappings: { [x: string]: JSX.Element } = {
    remove: <TrashIcon className="w-6 h-6 text-red-400" />,
    up: <ArrowUpIcon className="w-6 h-6" />,
    down: <ArrowDownIcon className="w-6 h-6" />,
};

type IconButtonProps = AddButtonProps & {
    icon: "remove" | "up" | "down";
};

export default function IconButton(props: IconButtonProps) {
    return (
        <button
            disabled={props.disabled}
            className={"mx-1 " + (props.disabled ? "text-gray-500 " : "")}
            onClick={(e) => props.onClick(e as any)}
        >
            {mappings[props.icon]}
        </button>
    );
}
