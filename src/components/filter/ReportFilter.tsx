import makeStyles from "@material-ui/core/styles/makeStyles";
import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {Divider, ListItemIcon, ListItemText, MenuItem, Popover, PopoverOrigin,} from "@material-ui/core";
import filterOptions, {filterCategories, filterGroups, singleFilters} from "./filterOptions";
import FilterOptionMenuList from "./FilterOptionMenuList";
import SelectedFilterMenuList from "./SelectedFilterMenuList";
import TextButton from "../buttons/TextButton";
import ScrollMenuList from "../material/ScrollMenuList";
import useURIData from "../../hooks/useURIData";
import FilterLineIcon from "remixicon-react/FilterLineIcon";

const useStyles = makeStyles((theme) => ({
    button: {
        borderStyle: "dashed",
        borderRadius: 18,
        borderColor: theme.palette.action.active,
        color: theme.palette.action.active,
        textTransform: "none"
    },
    menu: {
        '& .MuiList-padding': {
            paddingTop: 0,
            paddingBottom: 0,
        }
    },
    paper: {
        maxHeight: 288,
        display: 'flex',
        flexDirection: "column",
        overflow: "hidden"
    },
    listContainer: { display: "flex", flexDirection: "row", height: 288, width: 652 },
    actionContainer: { display: "flex", justifyContent: "flex-end", height: 32 },
    listIcon: {
        minWidth: 40,
    }
}))

const origin: PopoverOrigin = { vertical: 'top', horizontal: 'right' };

export interface DataFilters { [filterId: string]: string[] }

export interface SingleFilter {
    id: string;
    name: string;
}

export interface FilterGroup {
    id: string;
    name: string;
    filters: SingleFilter[];
}

export type Filter = SingleFilter | FilterGroup;

export interface SelectedFilter {
    parent: SingleFilter;
    child: SingleFilter;
}

export interface FilterCategory {
    id: string;
    name: string;
    icon: JSX.Element;
    filters: Filter[];
}

const ReportFilter: React.FC = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const [dataFilters, setDataFilters] = useURIData<DataFilters>("dataFilters");
    const initialFilters = mapToFilterArray(dataFilters);

    const [selectedCategory, setSelectedCategory] = useState(filterOptions[0]);
    const handleCategoryClick = (category: FilterCategory) => (e: React.MouseEvent<HTMLLIElement>) => {
        setSelectedCategory(category);
        e.preventDefault();
        e.stopPropagation();
    }

    const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>(initialFilters);
    const handleFilterClick = (group: FilterGroup | SingleFilter, filter: SingleFilter) => {
        const exists = selectedFilters.findIndex(sf => sf.child.id === filter.id);
        const newFilters = exists === -1 ? [...selectedFilters, { parent: group, child: filter }] : selectedFilters.filter(sf => sf.child.id !== filter.id);
        setSelectedFilters(newFilters);
    }

    const handleCancel = () => {
        setSelectedFilters(initialFilters);
        handleClose();
    }
    const handleApply = () => setDataFilters(arrayToFilterMap(selectedFilters));

    return (
        <React.Fragment>
            <Button
                id="filter-button"
                aria-controls="filter-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleButtonClick}
                variant="outlined"
                endIcon={<FilterLineIcon />}
                className={classes.button}
            >
                Tilføj filter
            </Button>
            <Popover
                id="filter-menu"
                aria-labelledby="filter-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCancel}
                onClick={handleClose}
                anchorOrigin={origin}
                transformOrigin={origin}
                className={classes.menu}
                PaperProps={{ className: classes.paper }}
            >
                <div className={classes.listContainer} >
                    <ScrollMenuList width={198} height={256}>
                        {filterOptions.map((category) => (
                            <MenuItem
                                key={category.id}
                                selected={selectedCategory.id === category.id}
                                onClick={handleCategoryClick(category)}
                            >
                                <ListItemIcon className={classes.listIcon}>{category.icon}</ListItemIcon>
                                <ListItemText>{category.name}</ListItemText>
                            </MenuItem>
                        ))}
                    </ScrollMenuList>

                    <Divider orientation="vertical" />
                    <FilterOptionMenuList
                        category={selectedCategory}
                        selected={selectedFilters}
                        onClick={handleFilterClick}
                    />

                    <Divider orientation="vertical" />
                    <SelectedFilterMenuList
                        selectedFilters={selectedFilters}
                        onClick={handleFilterClick}
                    />
                </div>
                <Divider orientation="horizontal"/>
                <div className={classes.actionContainer}>
                    <TextButton onClick={handleCancel}>Cancel</TextButton>
                    <TextButton color="primary" onClick={handleApply}>Apply</TextButton>
                </div>
            </Popover>
        </React.Fragment>
    )
}

const arrayToFilterMap = (arr: SelectedFilter[]) => arr.reduce((prev: DataFilters, curr) => {
    const list = prev[curr.parent.id] ?? [];

    return {
        ...prev,
        [curr.parent.id]: [curr.child.id, ...list],
    }
}, {} as DataFilters)

const mapToFilterArray = (map: { [key: string]: string[] }) => Object.keys(map).reduce((array, parentId) => {
    const list: SelectedFilter[] = map[parentId].map(childId => {
        const parentName = filterGroups[parentId]?.name ?? filterCategories[parentId]?.name;
        const childName = singleFilters[childId]?.name;

        if (parentName === undefined || childName === undefined) return undefined;

        return {
            parent: { id: parentId, name: parentName },
            child: { id: childId, name: childName },
        };
    }).filter(_ => _) as SelectedFilter[];

    return [ ...array, ...list];
}, [] as SelectedFilter[]);

export default ReportFilter;
