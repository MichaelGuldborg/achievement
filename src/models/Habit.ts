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
    startTime?: string;
    endTime?: string;
}

export const defaultHabit: Habit = {
    id: "",
    name: "",
}

export default Habit;