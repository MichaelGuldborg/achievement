import React from "react";
import DemographyIcon from "remixicon-react/Group2LineIcon"
import MoneyIcon from "remixicon-react/MoneyEuroCircleLineIcon";
import {FilterCategory, FilterGroup, SingleFilter} from "./ReportFilter";

export const singleFilters: { [id: string]: SingleFilter } = {
    "male": {id: "male", name: "Mand"},
    "female": {id: "female", name: "Kvinde"},
    "13-24": {id: "13-24", name: "13-24 år"},
    "25-34": {id: "25-34", name: "25-34 år"},
    "35-44": {id: "35-44", name: "35-44 år"},
    "45-54": {id: "45-54", name: "45-54 år"},
    "55-64": {id: "55-64", name: "55-64 år"},
    "65+": {id: "65+", name: "65+ år"},
    "capital": {id: "capital", name: "Hovedstaden"},
    "zealand": {id: "zealand", name: "Sjælland"},
    "southern": {id: "southern", name: "Syddanmark"},
    "midjutland": {id: "midjutland", name: "Midtjylland"},
    "northjutland": {id: "northjutland", name: "Nordjylland"},
    "primary": {id: "primary", name: "Kun primær"},
    "secondary": {id: "secondary", name: "Kun sekundær"},
}

// const str = Object.keys(singleFilters).map(id => 'singleFilters[\"' + id + '\"],\n').join("");
// console.log(str);

export const filterGroups: { [id: string]: FilterGroup } = {
    "sex": {
        id: "sex", name: "Køn", filters: [
            singleFilters["male"],
            singleFilters["female"]
        ]
    },
    "age": {
        id: "age", name: "Alder", filters: [
            singleFilters["13-24"],
            singleFilters["25-34"],
            singleFilters["35-44"],
            singleFilters["45-54"],
            singleFilters["55-64"],
            singleFilters["65+"],
        ]
    },
    "region": {
        id: "region", name: "Region", filters: [
            singleFilters["capital"],
            singleFilters["zealand"],
            singleFilters["southern"],
            singleFilters["midjutland"],
            singleFilters["northjutland"],
        ]
    }
}

export const filterCategories: { [id: string]: FilterCategory } = {
    "dempgraphy": {
        id: "demography",
        name: "Demografi",
        icon: <DemographyIcon/>,
        filters: [filterGroups["sex"], filterGroups["age"], filterGroups["region"]],
    },
    "economy": {
        id: "economy",
        name: "Økonomi",
        icon: <MoneyIcon/>,
        filters: [singleFilters["primary"], singleFilters["secondary"]],
    }
}

const filterOptions = Object.values(filterCategories);

export default filterOptions;