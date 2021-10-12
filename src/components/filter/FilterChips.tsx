import React from "react";
import Chip from "@material-ui/core/Chip";
import {DataFilters, FilterGroup} from "./ReportFilter";
import {filterCategories, filterGroups, singleFilters} from "./filterOptions";
import useURIData from "../../hooks/useURIData";

export const groupDataFilters = (df: DataFilters) => Object.keys(df).reduce((prev, curr) => {
    const parentName = filterGroups[curr]?.name ?? filterCategories[curr]?.name;

    const group: FilterGroup = { id: curr, name: parentName, filters: df[curr].map(childId => ({
            id: childId,
            name: singleFilters[childId]?.name,
        }))
    };

    return [...prev, group];
}, [] as FilterGroup[])

const FilterChips = () => {
    const [dataFilters, setDataFilters] = useURIData<DataFilters>("dataFilters");

    const filters = groupDataFilters(dataFilters);

    const handleDelete = (fg: FilterGroup) => () => {
        const newDataFilters = filters.filter(f => f.id !== fg.id).reduce((prev: DataFilters, curr) => ({
            ...prev,
            [curr.id]: curr.filters.map(f => f.id),
        }), {} as DataFilters);
        setDataFilters(newDataFilters);
    }

    const chips = filters.map(fg =>
        <Chip
            key={fg.id}
            label={`${fg.name}: ${fg.filters.map(f => f.name).join(" + ")}`}
            onDelete={handleDelete(fg)}
        />
    );

    return <React.Fragment>{chips}</React.Fragment>
}

export default FilterChips;
