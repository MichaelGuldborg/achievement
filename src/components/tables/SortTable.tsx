import React from "react";
import getComparator, {Order} from "../../lib/list/getComparator";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import stableSort from "../../lib/list/stableSort";
import {NamedObject} from "../../types";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import {Paper, Tooltip} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import HeadItem from "./HeadItem";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            // height: '80%',
            flex: 1,
            position: 'relative',
        },
        paper: {
            height: '100%',
            width: '100%',
            position: 'relative',
            boxShadow: '0 1px 4px rgba(0,0,0,.09)',
        },
        table: {},
        container: {
            height: '100%',
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }),
);

interface SortTableProps<T extends NamedObject> {
    heads: Array<HeadItem<T>>;
    initialOrderKey?: keyof T;
    initialOrder?: Order;
    elements: T[];
    actions?: JSX.Element;
    children: (elements: T[]) => JSX.Element | JSX.Element[];
}

const SortTable = <T extends NamedObject>({heads, elements, actions, initialOrder, initialOrderKey, children}: SortTableProps<T>) => {
    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>(initialOrder ?? 'asc');
    const [orderBy, setOrderBy] = React.useState<keyof T>(initialOrderKey ?? 'name');

    const handleRequestSort = (property: keyof T) => () => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const sortedRows = stableSort(elements, getComparator(order, orderBy)) as T[];


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer className={classes.container}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size="medium"
                        aria-label="enhanced table"
                        stickyHeader={true}
                    >
                        <TableHead>
                            <TableRow>
                                {heads.map((item) => (
                                    <TableCell
                                        key={item.id as string}
                                        align={item.numeric ? 'right' : 'left'}
                                        padding={item.disablePadding ? 'none' : 'default'}
                                        sortDirection={orderBy === item.id ? order : false}
                                    >
                                        <TableSortLabel
                                            active={orderBy === item.id}
                                            direction={orderBy === item.id ? order : 'asc'}
                                            onClick={handleRequestSort(item.id)}
                                        >
                                            <Tooltip title={item.tooltip ?? ''}>
                                                <div style={{whiteSpace: 'nowrap'}}>
                                                    {item.label}
                                                </div>
                                            </Tooltip>
                                            {orderBy === item.id && (
                                                <span className={classes.visuallyHidden}>
                                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </span>
                                            )}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                                {actions}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {children(sortedRows)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default SortTable;
