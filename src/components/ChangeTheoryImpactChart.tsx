import React, {useRef, useState} from "react";
import {Bar} from "react-chartjs-2/dist";
import {Chart} from "chart.js";
import {Paper} from "@material-ui/core";
import ChangeEffect from "../models/ChangeEffect";
import ChangeTheory from "../models/ChangeTheory";
import {getChangeValueByYear} from "../lib/sroi/getChangeValueByYear";
import SelectNamed from "./inputs/SelectNamed";
import {CHART_BORDER_COLORS} from "../constants/ChartColors";


export interface ImpactBarChartProps {
    theory: ChangeTheory;
}

export const ChangeTheoryImpactChart: React.FC<ImpactBarChartProps> = ({theory}) => {

    const ref = useRef<Chart>();
    const [mode, setMode] = useState<'normal' | 'stakeholder' | 'budget-social'>('normal')

    const colors = Object.values(CHART_BORDER_COLORS);
    const labels = ['2021', '2022', '2023', '2024', '2025'];
    const getStackName = (change: ChangeEffect) => {
        if (mode === "budget-social") return change.stakeholder?.includes('stat') ? 'budget' : 'social';
        if (mode === "stakeholder") return change.stakeholder;
        return '1';
    }


    theory.effects.sort((a, b) => b.value * b.count - a.value * a.count);
    const datasets = theory.effects.map((c, index) => {
        return ({
            label: c.name,
            stack: getStackName(c),
            backgroundColor: colors[index % colors.length],
            data: getChangeValueByYear(c),
        });
    })


    return (
        <Paper style={{padding: 8}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{minWidth: 180}}/>
                <span style={{fontSize: 24, fontWeight: 600}}>Impact Map</span>
                <SelectNamed
                    style={{minWidth: 180}}
                    value={mode}
                    onChange={(e) => setMode(e.target.value as any)}
                    variant={"outlined"}
                    options={[{
                        id: 'normal',
                        name: 'Normal',
                    }, {
                        id: 'budget-social',
                        name: 'Budget | Social'
                    }, {
                        id: 'stakeholder',
                        name: 'Kommune | Region | Stat '
                    }]}
                />
            </div>
            <Bar
                ref={ref}
                type={'bar'}
                data={{
                    labels: labels,
                    datasets: datasets
                }}
            />
        </Paper>
    )
};


export default ChangeTheoryImpactChart;