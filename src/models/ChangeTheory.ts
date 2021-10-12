import Effect from "./ChangeEffect";

export interface ChangeTheory {
    id?: string;
    name: string;
    investment: number;
    discountRate: number;
    effects: Effect[];
}


export default ChangeTheory;