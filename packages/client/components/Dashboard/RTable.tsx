import React, { useCallback, useEffect, useMemo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import type { Tag } from "@sushii-web/graphql";
import {
    CellMeasurer,
    CellMeasurerCache,
    AutoSizer,
    List,
} from "react-virtualized";
import type { ListRowRenderer } from "react-virtualized";
import {
    Column as VirtualizedColumn,
    Table as VirtualizedTable,
    TableCellProps,
    WindowScroller,
    TableHeaderProps,
} from "react-virtualized";
import "react-virtualized/styles.css";

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
import useWindowDimensions from "../../lib/useWindowDimensions";

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
function DesktopRow({ row, i, prepareRow }: RowComponentProps) {
    prepareRow(row);

    return (
        <div {...row.getRowProps()} className="hidden lg:table-row">
            {row.cells.map((cell) => {
                return (
                    <div
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
                    </div>
                );
            })}
        </div>
    );
}

function MobileRow({ row, i, prepareRow }: RowComponentProps) {
    prepareRow(row);

    const original = row.original as Tag;

    const markdownContent = useMemo(
        () => (
            <ReactMarkdown
                className="prose break-words text-gray-400"
                remarkPlugins={[gfm]}
                linkTarget="_blank"
            >
                {original.content}
            </ReactMarkdown>
        ),
        [original.content]
    );

    return (
        <div {...row.getRowProps()} className="block lg:hidden pb-0.5">
            <div className="rounded-lg shadow-lg bg-gray-750 border border-gray-700 my-4 p-4">
                <div className="text-sm flex items-center">
                    <img
                        loading="lazy"
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
                {markdownContent}
                <div className="mt-2 text-sm text-gray-300 flex justify-between">
                    <span>Used {original.useCount} times</span>

                    <span>
                        Created{" "}
                        {new Date(original.created).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
}

interface RowComponentProps {
    row: Row;
    i: number;
    prepareRow: (Row) => void;
}

function RowComponent(props: RowComponentProps) {
    return (
        <>
            <DesktopRow {...props} />
            <MobileRow {...props} />
        </>
    );
}

const cache = new CellMeasurerCache({
    defaultHeight: 72,
    fixedWidth: true,
});

const mobileCache = new CellMeasurerCache({
    defaultHeight: 458,
    fixedWidth: true,
});

interface TableCellRendererWithColumn extends TableCellProps {
    column: any;
}

interface TableHeaderRendererWithColumn extends TableHeaderProps {
    column: any;
}

interface RTableProps {
    columns: Column<any>[];
    data: any[];
}

export default function RTable({ columns, data }: RTableProps) {
    const columnsMemo = useMemo(() => columns, [columns]);
    const dataMemo = useMemo(() => data, [data]);

    const { width } = useWindowDimensions();

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
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headers,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns: columnsMemo,
            data: dataMemo,
            defaultColumn,
            filterTypes,
        },
        useFilters,
        useGlobalFilter,
        useSortBy
    );

    const TableRef = useRef<VirtualizedTable>();
    const ListRef = useRef<List>();

    const resetSizes = () => {
        cache.clearAll();
        mobileCache.clearAll();

        TableRef.current && TableRef.current.recomputeRowHeights();
        ListRef.current && ListRef.current.recomputeRowHeights();
    };

    useEffect(() => {
        // Rows different heights on rows change
        resetSizes();
    }, [rows]);

    // Render an entire row on mobile, single component
    const RenderRow = useCallback<ListRowRenderer>(
        ({ index, parent, key, style }) => {
            const row = rows[index];
            prepareRow(row);

            return (
                <CellMeasurer
                    cache={mobileCache}
                    columnIndex={0}
                    rowIndex={index}
                    key={key}
                    parent={parent}
                >
                    {({ registerChild }) => (
                        <div ref={registerChild} style={style}>
                            <MobileRow
                                row={row}
                                i={index}
                                prepareRow={prepareRow}
                            />
                        </div>
                    )}
                </CellMeasurer>
            );
        },
        [prepareRow, rows]
    );

    // Render a single table cell on desktop
    const RenderContentCell = useCallback<(TableCellRendererWithColumn) => any>(
        ({ rowIndex, columnIndex, parent, dataKey, rowData, column }) => {
            // prepareRow(rowData);

            return (
                <CellMeasurer
                    cache={cache}
                    columnIndex={columnIndex}
                    rowIndex={rowIndex}
                    parent={parent}
                >
                    {({ registerChild }) => (
                        <div
                            ref={registerChild}
                            className="whitespace-normal px-4 py-4"
                        >
                            {/* dumb way to add more space on bottom,
                             later border-4 to add "space" between elements */}
                            <div className="mb-2">
                                {column.accessor(rowData)}
                            </div>
                        </div>
                    )}
                </CellMeasurer>
            );
        },
        [prepareRow, rows]
    );

    const RenderTableHeader = useCallback<
        (TableHeaderRendererWithColumn) => any
    >(
        ({ column }) => (
            <div
                className="whitespace-nowrap px-4 py-3 normal-case
                           text-left text-sm font-medium tracking-wider 
                           border-b border-gray-700"
            >
                <div
                    className="flex cursor-pointer"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
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
                <div>{column.canFilter ? column.render("Filter") : null}</div>
            </div>
        ),
        [rows]
    );

    const RenderColumn = useCallback((column, i) => {
        return (
            <VirtualizedColumn
                width={190}
                flexGrow={i === 3 ? 1 : 0}
                label={column.Header}
                dataKey={column.id}
                className="whitespace-normal self-start first:rounded-l-lg last:rounded-r-lg bg-gray-750"
                style={{ overflow: "visible", marginRight: 0, height: "100%" }}
                cellRenderer={(cellData) =>
                    RenderContentCell({ ...cellData, column })
                }
                headerRenderer={() => RenderTableHeader({ column })}
            />
        );
    }, []);

    const RenderHeader = useCallback((column, i) => {
        // Add the sorting props to control sorting. For this example
        // we can add them into the header props
        return (
            <div
                key={i}
                className="block lg:table-cell whitespace-nowrap px-4 py-3
                           dark:text-left text-sm font-medium tracking-wider 
                           dark:border-b border-gray-700"
            >
                <div
                    className="flex cursor-pointer"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
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
                <div>{column.canFilter ? column.render("Filter") : null}</div>
            </div>
        );
    }, []);

    const RenderEmpty = () => {
        return (
            <div className="text-center block w-full mb-4 p-6 bg-gray-750 rounded-lg">
                No tags found! :(
            </div>
        );
    };

    return (
        <>
            <div className="hidden">
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            </div>
            {/* -lg size, prevent render entirely */}
            {width > 1024 ? (
                <AutoSizer onResize={resetSizes}>
                    {({ height, width }) => (
                        <>
                            <VirtualizedTable
                                ref={TableRef}
                                width={width}
                                height={height}
                                headerHeight={120}
                                rowHeight={cache.rowHeight}
                                rowCount={rows.length}
                                rowGetter={({ index }) => rows[index].original}
                                rowStyle={{ overflow: "visible" }}
                                rowClassName={({ index }) =>
                                    index >= 0 ? "border-4 border-gray-800" : ""
                                }
                                noRowsRenderer={RenderEmpty}
                            >
                                {headers.map((column, i) =>
                                    RenderColumn(column, i)
                                )}
                            </VirtualizedTable>
                        </>
                    )}
                </AutoSizer>
            ) : (
                <div className="w-full">
                    <div className="lg:inline-block">
                        {headers.map((column, i) => RenderHeader(column, i))}
                    </div>
                    <WindowScroller>
                        {({ height, registerChild, scrollTop }) => (
                            <AutoSizer disableHeight>
                                {({ width }) => (
                                    <div ref={registerChild}>
                                        <List
                                            ref={ListRef}
                                            autoHeight={true}
                                            height={height}
                                            width={width}
                                            scrollTop={scrollTop}
                                            rowCount={rows.length}
                                            rowHeight={mobileCache.rowHeight}
                                            rowRenderer={RenderRow}
                                            deferredMeasurementCache={
                                                mobileCache
                                            }
                                            noRowsRenderer={RenderEmpty}
                                            overscanRowCount={10}
                                        />
                                    </div>
                                )}
                            </AutoSizer>
                        )}
                    </WindowScroller>
                </div>
            )}
        </>
    );
}
