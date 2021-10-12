import React from "react";
import ReportFilter from "../../components/filter/ReportFilter";
import FilterChips from "../../components/filter/FilterChips";
import TimeRangeSelector from "../../components/pickers/TimeRangeSelector";

export const TestPage: React.FC = () => {


    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#fff"
        }}>
            <ReportFilter/><FilterChips/><TimeRangeSelector/>
        </div>
    )
}

export default TestPage;
