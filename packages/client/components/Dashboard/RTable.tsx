import React, { useMemo } from "react";
import { useTable, useSortBy, Column } from "react-table";
import {
    SortAscendingIcon,
    SortDescendingIcon,
    SwitchVerticalIcon,
} from "@heroicons/react/solid";

function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    );

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th
                                    className="whitespace-nowrap cursor-pointer px-4 py-3
                                    text-left text-sm font-medium tracking-wider 
                                    border-b border-gray-700"
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    <div className="flex">
                                        {column.render("Header")}
                                        {/* Add a sort direction indicator */}
                                        <span className="ml-2">
                                            {column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <SortDescendingIcon className="w-6 h-6 text-orange-500" />
                                                ) : (
                                                    <SortAscendingIcon className="w-6 h-6 text-blue-500" />
                                                )
                                            ) : (
                                                <SwitchVerticalIcon className="w-6 h-6" />
                                            )}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                className="even:bg-gray-800"
                            >
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className="px-4 py-4"
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

interface RTableProps {
    columns: Column[];
    data: any[];
}

export default function RTable({ columns, data }: RTableProps) {
    const columnsMemo = useMemo(() => columns, [columns]);
    const dataMemo = useMemo(() => data, [data]);

    return (
        <div>
            <Table columns={columnsMemo} data={dataMemo} />
        </div>
    );
}
