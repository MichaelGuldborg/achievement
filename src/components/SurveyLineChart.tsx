import React, {useRef} from "react";
import {Line} from "react-chartjs-2/dist";
import {Chart} from "chart.js";
import {Paper} from "@material-ui/core";
import {toLocalMonthYear} from "../lib/date/toLocalISO";
import {SurveyAnswer} from "../models/WHO5Answer";
import CHART_COLORS, {CHART_BORDER_COLORS} from "../constants/ChartColors";

export interface SurveyChartProps {
    title: string;
    labels: string[];
    surveys?: SurveyAnswer[]
}

export const SurveyLineChart: React.FC<SurveyChartProps> = ({title, labels, surveys}) => {

    const ref = useRef<Chart>();
    const borderColors = Object.values(CHART_BORDER_COLORS);
    const colors = Object.values(CHART_COLORS);

    if (surveys === undefined) return <div/>


    // [{},{}]
    // [[1a,2a,3a],[1b,2b,3b]]
    const answersByIndex = surveys?.reduce((result: number[][], who5: SurveyAnswer) => {
        who5.answers.forEach((a, i) => {
            result[i] = [...(result[i] ?? []), who5.answers[i]]
        })
        return result;
    }, [])


    const datasets = answersByIndex.map((values, index) => {
        return ({
            label: labels[index],
            borderColor: borderColors[index % borderColors.length],
            backgroundColor: colors[index % colors.length],
            data: values,
        });
    });


    return (
        <Paper style={{padding: 8}}>
            <PaperTitle title={title}/>
            <Line
                ref={ref}
                type={'line'}
                data={{
                    labels: surveys.map((e) => toLocalMonthYear(e.createdAt)),
                    datasets: datasets
                }}
            />
        </Paper>
    )
};

export const PaperTitle: React.FC<{ title: string }> = ({title}) => {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8, marginBottom: 8}}>
        <span style={{fontSize: 24, fontWeight: 600}}>{title}</span>
    </div>
}


export default SurveyLineChart;