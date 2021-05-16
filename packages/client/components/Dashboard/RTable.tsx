import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import type { Tag } from "@sushii-web/graphql";
import {
    useTable,
    useSortBy,
    Column,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce,
    Row,
    FilterProps,
} from "react-table";
import {
    SortAscendingIcon,
    SortDescendingIcon,
    SwitchVerticalIcon,
} from "@heroicons/react/solid";
import { matchSorter } from "match-sorter";

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <span>
            Search:{" "}
            <input
                className="bg-gray-700 border border-gray-600 focus:border-blue-500
                           rounded mt-2 p-2 text-white"
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} tags...`}
            />
        </span>
    );
}

// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, Header, preFilteredRows, setFilter },
}) {
    return (
        <input
            className="bg-gray-700 border border-gray-600 focus:border-blue-500
                        rounded mt-2 p-2 text-white w-full"
            value={filterValue || ""}
            onChange={(e) => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${Header.toLowerCase()}`}
        />
    );
}

function fuzzyContentObjFilterFn(
    rows: Row[],
    id: string[],
    filterValue: string
) {
    return matchSorter(rows, filterValue, {
        keys: ["original.content"],
    });
}

function fuzzyOwnerObjFilterFn(rows: Row[], id: string[], filterValue: string) {
    return matchSorter(rows, filterValue, {
        keys: [
            "original.owner.name",
            "original.discriminator",
            "original.ownerId",
        ],
    });
}

function fuzzyTextFilterFn(rows: Row[], id: string[], filterValue: string) {
    // https://github.com/tannerlinsley/react-table/issues/2644
    // id is a string[] not string
    return matchSorter(rows, filterValue, {
        keys: [(row) => row.values[id[0]]],
    });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;
fuzzyContentObjFilterFn.autoRemove = (val) => !val;
fuzzyOwnerObjFilterFn.autoRemove = (val) => !val;

// Table row displayed on desktop, no special layout so all cells are the same
function DesktopRow({ prepareRow, row, i }: RowComponentProps) {
    console.log(row);
    prepareRow(row);

    return (
        <tr {...row.getRowProps()} className="hidden lg:table-row">
            {row.cells.map((cell) => {
                return (
                    <td
                        {...cell.getCellProps()}
                        className={
                            "px-4 py-4 \
                                flex justify-between items-center lg:table-cell \
                                lg:first:rounded-l-lg lg:last:rounded-r-lg " +
                            (i % 2 == 1 ? "bg-gray-750" : "")
                        }
                    >
                        <div className="lg:hidden inline-block">
                            {cell.column.Header}
                        </div>
                        {cell.render("Cell")}
                    </td>
                );
            })}
        </tr>
    );
}

function MobileRow({ prepareRow, row, i }: RowComponentProps) {
    const original = row.original as Tag;

    return (
        <tr {...row.getRowProps()} className="block lg:hidden">
            <div className="rounded-lg shadow-lg bg-gray-750 border border-gray-700 my-4 p-4">
                <div className="text-sm flex items-center">
                    <img
                        className="rounded-full w-6 h-6"
                        src={
                            original.owner?.avatarUrl ||
                            `https://cdn.discordapp.com/embed/avatars/${
                                original.ownerId % 5
                            }.png`
                        }
                    />
                    <span className="ml-2 text-gray-400">
                        {original.owner?.name || "ID " + original.ownerId}
                    </span>
                </div>
                <div className="mt-2 text-lg font-semibold">
                    {original.tagName}
                </div>

                <ReactMarkdown
                    className="prose break-words text-gray-400"
                    remarkPlugins={[gfm]}
                    linkTarget="_blank"
                >
                    {original.content}
                </ReactMarkdown>
                <div className="mt-2 text-sm text-gray-300 flex justify-between">
                    <span>Used {original.useCount} times</span>

                    <span>
                        Created{" "}
                        {new Date(original.created).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </tr>
    );
}

interface RowComponentProps {
    prepareRow: (row: Row) => void;
    row: Row;
    i: number;
}

function RowComponent(props: RowComponentProps) {
    const { row, prepareRow } = props;

    console.log(row);
    prepareRow(row);

    return (
        <>
            <DesktopRow {...props} />
            <MobileRow {...props} />
        </>
    );
}

function Table({ columns, data }) {
    const filterTypes = useMemo(
        () => ({
            fuzzyText: fuzzyTextFilterFn,
            fuzzyOwnerObj: fuzzyOwnerObjFilterFn,
            fuzzyContentObj: fuzzyContentObjFilterFn,
        }),
        []
    );

    const defaultColumn = useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
        },
        useFilters,
        useGlobalFilter,
        useSortBy
    );

    return (
        <>
            <div className="hidden">
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            </div>
            <table
                {...getTableProps()}
                className="table-auto border-separate max-w-full"
                style={{ borderSpacing: "0 0.75rem" }}
            >
                <thead className="lg:table-header-group">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th
                                    className="block lg:table-cell whitespace-nowrap px-4 py-3
                                    text-left text-sm font-medium tracking-wider 
                                    border-b border-gray-700"
                                >
                                    <div
                                        className="flex cursor-pointer"
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps()
                                        )}
                                    >
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
                                    <div>
                                        {column.canFilter
                                            ? column.render("Filter")
                                            : null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => (
                        <RowComponent prepareRow={prepareRow} row={row} i={i} />
                    ))}
                </tbody>
            </table>
            {rows.length === 0 && (
                <div className="text-center block w-full mb-4 p-6 bg-gray-750 rounded-lg">
                    No tags found! :(
                </div>
            )}
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
