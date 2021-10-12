import React from "react";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import {NamedObject} from "../../types";
import BaseTable from "./BaseTable";
import HeadItem from "./HeadItem";

interface SelectTableProps<T extends NamedObject> {
    heads: Array<HeadItem<T>>;
    rows: T[];
    selected: string[];
    setSelected: (selected: string[]) => void;
}

const SelectTable = <T extends NamedObject>
({
     heads,
     rows,
     selected,
     setSelected
 }: SelectTableProps<T>) => {

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    const EndHead = (
        <TableCell padding="checkbox">
            <Checkbox
                indeterminate={selected.length > 0 && selected.length < rows.length}
                checked={rows.length > 0 && selected.length === rows.length}
                onChange={handleSelectAllClick}
                inputProps={{ 'aria-label': 'select all' }}
            />
        </TableCell>
    )

    const EndCell = (row: T, index: number) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `select-table-checkbox-${index}`;
        return (
            <TableCell padding="checkbox">
                <Checkbox
                    checked={isItemSelected}
                    inputProps={{'aria-labelledby': labelId}}
                />
            </TableCell>
        );
    }

    return (
        <BaseTable
            heads={heads}
            elements={rows}
            onClick={handleClick}
            actions={EndHead}
            endCell={EndCell}
        />
    )
}

export default SelectTable;
