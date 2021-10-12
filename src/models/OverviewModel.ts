export interface VerticalBarDataset {
    label: string,
    data: number[],
    backgroundColor: string,
    barThickness: number
}

export const emptyVerticalBarDataset: VerticalBarDataset = {
    label: 'Samples',
    data: [],
    backgroundColor: 'rgba(255, 99, 132,1)',
    barThickness: 4,
}

export type ModuleData = {
    datasets: VerticalBarDataset[]
    labels: string[] | number[]
}

export type ChartType = 'bar' | 'pie' | 'radar';

export type AggregationtType = 'count' | 'distribution';

export type ServiceType = 'chat' | 'survey';

export default interface OverviewModule {
    id: string;
    name: string;
    index: number;
    type?: ChartType;
    color: string;
    service?: ServiceType;
    aggregation?: AggregationtType;
    fields: string[];
}

export const emptyOverviewModule: OverviewModule = {
    id: '',
    name: '',
    index: 0,
    color: '#ffffff',
    fields: []
};