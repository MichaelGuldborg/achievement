import React from "react";
import {Checkbox, MenuItem} from "@material-ui/core";
import {SingleFilter} from "./ReportFilter";

interface FilterMenuItemProps {
    filter: SingleFilter;
    checked?: boolean;
    onClick: (filter: SingleFilter) => void;
}

const MenuFilterOption = ({ filter, checked = false, onClick }: FilterMenuItemProps) => {

    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        onClick(filter);
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <MenuItem key={filter.id} onClick={handleClick} >
            <Checkbox
                checked={checked}
                disableRipple
                disableFocusRipple
                disableTouchRipple
                color="primary"
                size="small"
                style={{ padding: 0 , marginRight: 8 }}
            />
            {filter.name}
        </MenuItem>
    )
}

export default MenuFilterOption;
