export interface PatientChange {
    id: string;
    name: string;
    date: Date | string;
    type: string;
    before: string;
    after: string;
    indicator: number; // -1 .. 1
}

export default PatientChange;