import Widget from "./Widget";
import {TimeData} from "../components/pickers/TimeRangeSelector";
import {DataFilters} from "../components/filter/ReportFilter";

export interface Report {
    id: string;
    author: { id: string, name: string };
    createdAt: Date;
    updatedAt: Date;
    title: string;
    widgets: Widget[];
    timeData?: TimeData;
    filters?: DataFilters;
}

export default Report;