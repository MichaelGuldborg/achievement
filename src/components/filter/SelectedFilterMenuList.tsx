import {Divider, ListItem, ListItemIcon, ListItemText, MenuItem, Typography} from "@material-ui/core";
import CloseIcon from "remixicon-react/CloseLineIcon";
import React from "react";
import {FilterGroup, SelectedFilter, SingleFilter} from "./ReportFilter";
import {groupByKey} from "../../lib/list/groupBy";
import ScrollMenuList from "../material/ScrollMenuList";

interface SelectedFilterMenuListProps {
    selectedFilters: SelectedFilter[];
    onClick: (group: FilterGroup | SingleFilter, filter: SingleFilter) => void;
}

const SelectedFilterMenuList: React.FC<SelectedFilterMenuListProps> = ({selectedFilters, onClick}) => {

    const filterMap = groupByKey(selectedFilters, i => i.parent.name);
    const handleClear = (sf: SelectedFilter) => (e: React.MouseEvent<HTMLLIElement>) => {
        onClick(sf.parent, sf.child);
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <ScrollMenuList width={198} height={256}>
            <ListItem dense>
                <ListItemText>
                    {selectedFilters.length === 0 ? "Ingen filtre valgt" : selectedFilters.length === 1 ? "1 filter valgt" : "" + selectedFilters.length + " filtre valgt"}
                </ListItemText>
            </ListItem>
            <Divider orientation="horizontal" />
            {Object.keys(filterMap).map(groupName => {
                const head = (
                    <ListItem key={groupName} dense >
                        <Typography variant="subtitle2"  component="div">
                            {groupName}
                        </Typography>
                    </ListItem>
                );

                const items = filterMap[groupName].map(sf => (
                    <MenuItem key={sf.child.id} dense onClick={handleClear(sf)}>
                        <ListItemText>{sf.child.name}</ListItemText>
                        <ListItemIcon style={{ minWidth: 0 }}><CloseIcon /></ListItemIcon>
                    </MenuItem>
                ))

                return [head, ...items];
            })}
        </ScrollMenuList>
    )
}

export default SelectedFilterMenuList;
