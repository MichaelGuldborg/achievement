import React from "react";
import {NamedObject} from "../../types";
import HeadItem from "./HeadItem";
import SortTable from "./SortTable";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {Checkbox} from "@material-ui/core";
import {toLocalDateMothYearString} from "../../lib/date/toLocalISO";
import formatNumber from "../../lib/string/formatNumber";
import {Order} from "../../lib/list/getComparator";

interface BaseTableProps<T extends NamedObject> {
    heads: Array<HeadItem<T>>;
    initialOrderKey?: keyof T;
    initialOrder?: Order;
    elements: T[];
    actions?: JSX.Element;
    onClick?: (e: React.MouseEvent<HTMLTableRowElement>, id: string) => void;
    endCell?: (row: T, i: number) => JSX.Element;
    children?: React.ReactNode;
}

const BaseTable = <T extends NamedObject>({heads, elements, onClick, actions, initialOrder, initialOrderKey, endCell, children}: BaseTableProps<T>) => {
    const filteredHeads = heads.filter((e) => !e.hidden);
    const handleRowClick = (rowId: string) => (e: React.MouseEvent<HTMLTableRowElement>) => onClick && onClick(e, rowId);
    const renderRowValue = (row: T, head: HeadItem<T>) => {
        if (head.render) return head.render(row);
        if (head.hideNull && !Boolean(row[head.id])) return '';

        if (typeof row[head.id].getMonth === 'function') {
            return toLocalDateMothYearString(row[head.id]);
        }
        const valueType = typeof row[head.id];

        if (valueType === 'boolean') {
            return <Checkbox
                checked={row[head.id]}
                disabled={true}
                color="primary"
                style={{padding: 0}}
            />
        }
        if (valueType === 'number' || valueType === 'bigint') {
            if (head.percent) return (row[head.id] * 100) + ' %';
            return formatNumber(Math.round(row[head.id]))
        }

        if (head.numeric) {
            return formatNumber(row[head.id])
        }
        return row[head.id];
    }

    return (
        <SortTable
            heads={filteredHeads}
            initialOrder={initialOrder}
            initialOrderKey={initialOrderKey}
            elements={elements}
            actions={actions}
        >
            {(sortedElements) => (
                <>
                    {sortedElements.map((element, i) => (
                        <TableRow
                            key={element.id}
                            tabIndex={-1}
                            hover={Boolean(onClick)}
                            onClick={handleRowClick(element.id)}
                            style={{cursor: Boolean(onClick) ? 'pointer' : undefined}}
                        >
                            {filteredHeads.map(head => (
                                <TableCell key={head.id as string} align={head.numeric ? 'right' : 'left'}>
                                    {renderRowValue(element, head)}
                                </TableCell>
                            ))}
                            {endCell && endCell(element, i)}
                        </TableRow>
                    ))}
                    {children}
                </>
            )}
        </SortTable>
    );
}

export default BaseTable;
