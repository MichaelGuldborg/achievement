export type WidgetSpan = 1 | 2 | 3 | 4;

export interface Widget {
    id: string;
    title: string;
    type: string;
    spanning: WidgetSpan;
}

export default Widget;
