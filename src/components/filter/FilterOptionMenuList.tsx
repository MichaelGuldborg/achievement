import React, {useState} from "react";
import {Divider, ListItem, ListItemText, MenuItem, MenuList} from "@material-ui/core";
import MenuFilterOption from "./MenuFilterOption";
import {Filter, FilterCategory, FilterGroup, SelectedFilter, SingleFilter} from "./ReportFilter";
import ScrollMenuList from "../material/ScrollMenuList";

interface FilterOptionMenuList {
    category: FilterCategory;
    selected: SelectedFilter[];
    onClick: (group: FilterGroup, single: SingleFilter) => void;
}

const isGroup = (test: Filter): test is FilterGroup => {
    return (test as FilterGroup).filters !== undefined;
}

const FilterOptionMenuList: React.FC<FilterOptionMenuList> = ({category, selected, onClick}) => {

    const [selectedGroup, setSelectedGroup] = useState<string>();
    const handleSelect = (id: string) => (e: React.MouseEvent<HTMLLIElement>) => {
        setSelectedGroup(id === selectedGroup ? undefined : id);
        e.preventDefault();
        e.stopPropagation();
    }

    const handleSubGroupFilterClick = (group: FilterGroup) => (filter: SingleFilter) => onClick(group, filter);

    const menuItems: JSX.Element[][] = category.filters.map(option => {
        const isGroupSelected = option.id === selectedGroup;
        if (isGroup(option)) {
            const filterGroup = option;

            const head = (
                <MenuItem
                    key={filterGroup.id}
                    onClick={handleSelect(filterGroup.id)}
                    selected={isGroupSelected}
                >
                    {filterGroup.name}
                </MenuItem>
            )

            if (isGroupSelected) {
                const items = filterGroup.filters.map(filter => (
                    <MenuFilterOption
                        key={filter.id}
                        filter={filter}
                        checked={Boolean(selected.find(sf => sf.child.id === filter.id))}
                        onClick={handleSubGroupFilterClick(filterGroup)}
                    />
                ))

                return [head, ...items];
            }

            return [head];
        }

        const filter = option;
        const item = (
            <MenuFilterOption
                key={filter.id}
                filter={filter}
                checked={Boolean(selected.find(sf => sf.child.id === filter.id))}
                onClick={handleSubGroupFilterClick(category)}
            />
        )

        return [item];
    })

    return (
        <ScrollMenuList width={256} height={256}>
            <ListItem dense>
                <ListItemText>
                    Vælg filter
                </ListItemText>
            </ListItem>
            <Divider orientation="horizontal" />
            {menuItems}
        </ScrollMenuList>
    )
}

export default FilterOptionMenuList;
