import React from "react";
import TableCell from "@material-ui/core/TableCell";
import {NamedObject} from "../../types";
import IconButton from "@material-ui/core/IconButton";
import More2FillIcon from "remixicon-react/More2FillIcon";
import BaseTable from "./BaseTable";
import HeadItem from "./HeadItem";

interface MenuTableProps<T extends NamedObject> {
    heads: Array<HeadItem<T>>;
    elements: T[];
    onMenuClick: (event: React.MouseEvent<HTMLElement>, id: string) => void;
}

const MenuTable = <T extends NamedObject>({ heads, elements, onMenuClick }: MenuTableProps<T>) => {
    const handleMenuClick = (id: string) => (e: React.MouseEvent<HTMLElement>) => onMenuClick(e, id);

    const EndHead = <TableCell padding="checkbox" />

    const EndCell = (row: T) => (
        <TableCell padding="checkbox">
            <IconButton
                aria-label="more"
                aria-controls="more-menu"
                aria-haspopup="true"
                onClick={handleMenuClick(row.id)}
            >
                <More2FillIcon />
            </IconButton>
        </TableCell>
    )

    return (
        <BaseTable
            heads={heads}
            elements={elements}
            actions={EndHead}
            endCell={EndCell}
        />
    );
}

export default MenuTable;
