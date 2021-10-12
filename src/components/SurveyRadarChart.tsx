import React, {useRef} from "react";
import {Radar} from "react-chartjs-2/dist";
import {Chart} from "chart.js";
import {Paper} from "@material-ui/core";
import {monthNames, toLocalMonthYear} from "../lib/date/toLocalISO";
import {PaperTitle, SurveyChartProps} from "./SurveyLineChart";
import CHART_COLORS, {CHART_BORDER_COLORS} from "../constants/ChartColors";


export const SurveyRadarChart: React.FC<SurveyChartProps> = ({title, labels, surveys}) => {

    const ref = useRef<Chart>();
    const borderColors = Object.values(CHART_BORDER_COLORS);
    const colors = Object.values(CHART_COLORS);


    if (surveys === undefined) return <div/>

    const thisMonth = surveys.map((e, index) => {
        return ({
            label: new Date(e.createdAt).getMonth() === new Date().getMonth() ? "Denne måned" : "Sidste måned", // toLocalMonthYear(e.createdAt),
            borderColor: borderColors[index % borderColors.length],
            backgroundColor: colors[index % colors.length],
            data: e.answers,
        });
    })

    return (
        <Paper style={{height: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <PaperTitle title={title}/>
            <Radar
                ref={ref}
                type={'radar'}
                data={{
                    labels: labels,
                    datasets: thisMonth
                }}
                options={{
                    scale: {
                        ticks: {
                            beginAtZero: true,
                            max: 5,
                            min: 0,
                            stepSize: 1
                        }
                    }
                }}
            />
            <div/>
        </Paper>
    )
};


export default SurveyRadarChart;