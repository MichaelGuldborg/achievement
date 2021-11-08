import {BalanceType} from "../data/balances";

export interface Habit {
    id: string;
    name: string,
    type?: BalanceType,
    secondaryTypes?: BalanceType[]
    isDaily?: boolean,
    isMonthly?: boolean,
    isYearly?: boolean,
    dayOfWeek?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
    timeOfDay: string,
}

export const defaultHabit: Habit = {
    id: "",
    name: "",
    timeOfDay: ""
}

export default Habit;