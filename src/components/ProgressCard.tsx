import {Paper, Typography} from "@material-ui/core";
import {CHART_BORDER_COLORS, CHART_OTHER_COLORS} from "../constants/ChartColors";
import React from "react";

interface ProgressCardProps {
    title: string;
    last: number;
    prev: number;
    min: number;
    max: number;
    color: keyof typeof CHART_BORDER_COLORS;
}


export const ProgressCard: React.FC<ProgressCardProps> = ({title, last, prev, min, max, color}) => {

    const lastProgress = ((last - min) / (max - min)) * 100;
    const prevProgress = ((prev - min) / (max - min)) * 100;

    return (
        <Paper style={{padding: 16, margin: 8, color: "white", backgroundColor: CHART_OTHER_COLORS[color]}}>
            <Typography variant="h6" component="div" color="inherit" align="right" style={{fontWeight: "bold"}}>
                {title.toLocaleUpperCase()}
            </Typography>

            <div style={{display: "flex", alignItems: "end"}}>
                <Typography variant="h4" component="div" color="inherit"
                            style={{color: CHART_BORDER_COLORS[color], fontWeight: "bold", paddingRight: 16}}>
                    {lastProgress + "%"}
                </Typography>

                <Typography variant="h5" component="div" color="inherit" style={{color: CHART_BORDER_COLORS.grey}}>
                    {prevProgress + "%"}
                </Typography>
            </div>

            <ProgressBar progress={lastProgress} color={CHART_BORDER_COLORS[color]}/>
            <ProgressBar progress={prevProgress} color={CHART_BORDER_COLORS.grey}/>
        </Paper>
    )
}

interface ProgressBarProps {
    progress: number;
    color: string;
}

const ProgressBar = ({progress, color}: ProgressBarProps) => {
    const height = 10;

    return (
        <div style={{width: "100%", borderColor: color, display: "flex", borderRadius: 4, margin: "8px 0"}}>
            <div style={{height, width: progress + "%", backgroundColor: color}}/>
            <div style={{height, width: 100 - progress + "%", backgroundColor: "white"}}/>
        </div>
    )
}