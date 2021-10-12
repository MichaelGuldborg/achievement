import React, {useRef} from "react";
import {Bubble} from "react-chartjs-2/dist";
import {Chart} from "chart.js";
import {Paper} from "@material-ui/core";
import Patient from "../models/Patient";
import toAge from "../lib/date/toAge";
import {CHART_BORDER_COLORS} from "../constants/ChartColors";


export type BubbleDataSet = {
    label: string;
    borderColor?: string;
    backgroundColor?: string,
    data: { x: number; y: number; r: number }[]
};


const regions = [
    'Hovedstaden',
    'Storkøbenhavn',
    'Nordsjælland og bornholm',
    'Sjælland',
    'Fyn',
    'Sønderjylland',
    'Midtjylland',
    'Østjylland',
    'Nordjylland',
]

export const TargetGroupScatterChart: React.FC<{ patients?: Patient[] }> = ({patients}) => {

    const ref = useRef<Chart>();


    if (patients === undefined) return <div/>


    const datasets = patients.reduce((datasets: BubbleDataSet[], p) => {
        const datasetIndex = p.sex?.toLowerCase() === 'male' ? 0 : 1;
        const age = toAge(p.birthDate);
        const postalCode = p.postalCode;
        if (!age || !postalCode) return datasets;

        const x = age;
        const y = Math.floor(postalCode / 1000) - 1;

        const index = datasets[datasetIndex].data.findIndex(d => d.x === x && d.y === y);
        if (index !== -1) {
            datasets[datasetIndex].data[index].r += 2;
            return datasets;
        }


        datasets[datasetIndex].data.push({
            x: x,
            y: y,
            r: 2,
        })
        return datasets;
    }, [{
        label: 'Mand',
        borderColor: CHART_BORDER_COLORS.blue,
        backgroundColor: CHART_BORDER_COLORS.blue,
        data: [],
    }, {
        label: 'Kvinde',
        borderColor: CHART_BORDER_COLORS.red,
        backgroundColor: CHART_BORDER_COLORS.red,
        data: [],
    }])


    return (
        <Paper style={{padding: 8}}>
            <Bubble
                ref={ref}
                type={'bubble'}
                options={{
                    scales: {
                        y: {
                            ticks: {
                                // Include a dollar sign in the ticks
                                callback: (value: number, index: number) => {
                                    return regions[value];
                                }
                            }
                        }
                    }
                }}
                data={{
                    datasets: datasets
                }}
            />
        </Paper>
    )
};


export default TargetGroupScatterChart;