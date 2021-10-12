import searchFilter from "../lib/list/searchFilter";

export interface ChangeEffect {
    id?: string;
    name: string;
    stakeholder?: string;
    description?: string;
    stakeHolderDescription?: string;
    measurementMethod?: string;
    source?: string;


    count: number;
    successRate: number;
    value: number;
    years: number;
    deadWeight: number;
    displacement: number;
    attribution: number;
    dropOff: number;
}

export const emptyChange: ChangeEffect = {
    id: "",
    name: "",
    count: 0,
    successRate: 0,
    value: 0,
    years: 0,
    attribution: 0,
    deadWeight: 0,
    displacement: 0,
    dropOff: 0,
};



export const changeSearchFilter = (search: string) => ({name}: ChangeEffect) => searchFilter({
    name: name,
}, search);

export default ChangeEffect;