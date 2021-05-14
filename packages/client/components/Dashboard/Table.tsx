import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column, ColumnBodyType, ColumnProps } from "primereact/column";

interface TableProps {
    columns: ColumnProps[];
    data: any[];
}

export default function Table({ columns, data }: TableProps) {
    const [selectedItems, setSelectedItems] = useState(null);

    return (
        <div>
            <DataTable
                value={data}
                removableSort
                rowClassName={() => {
                    return { "even:bg-gray-800": true };
                }}
                emptyMessage="No tags found."
                selectionMode="multiple"
                selection={selectedItems}
                onSelectionChange={(e) => setSelectedItems(e.value)}
            >
                <Column selectionMode="multiple" headerClassName="w-3" />
                {columns.map((col, i) => {
                    return (
                        <Column
                            key={col.field}
                            headerClassName="cursor-pointer px-4 py-3 whitespace-nowrap
                                    text-left text-sm font-medium tracking-wider border-b border-gray-700"
                            className="px-4 py-4"
                            {...col}
                        />
                    );
                })}
            </DataTable>
        </div>
    );
}
