export interface Issue {
    id: string;
    type: IssueType;
    name: string;
    value: number;
}

export type IssueType = 'accommodation'
    | 'occupation'
    | 'income'
    | 'substance-abuse'
    | 'physical'
    | 'psychological'
    | 'who5';

export default Issue;