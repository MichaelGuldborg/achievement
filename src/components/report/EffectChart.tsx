import {Paper} from "@material-ui/core";
import React from "react";
import {Line,} from "react-chartjs-2/dist";
import {CHART_BORDER_COLORS} from "../../constants/ChartColors";
import {toLocalDateMothYearString} from "../../lib/date/toLocalISO";
import getDates from "../../lib/date/getDates";
import {render} from "react-dom";
import capitalize from "@material-ui/core/utils/capitalize";
import round from "../../lib/math/round";
import rand, {randomFloat, randomInt} from "../../lib/math/rand";
import EffectChartTooltip from "./EffectChartTooltip";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import {changes} from "../../data/changes";


export interface EffectGraphProps {
    labels?: string[];
    actual?: number[];
    expected?: number[];
    accumulate?: boolean;
}


export const EffectChart: React.FC<EffectGraphProps> = (
    {
        labels,
        actual,
        expected,
        accumulate = true,
    }
) => {

    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth() + 1 % 12, 1, 0, 0);
    const defaultLabels = getDates(start, end).map(date => toLocalDateMothYearString(date));
    const defaultValues = defaultLabels.filter((_, i) => i < now.getDate()).map((l, i) => {
        if (i === 0) return 0
        return round(randomInt(30) * rand(), 0);
    })
    const defaultExpected = defaultLabels.map((l, i) => {
        if (i === 0) return 0
        return round(100 / (defaultLabels.length), 0);
    })

    labels = labels ?? defaultLabels;
    actual = actual ?? defaultValues;
    expected = expected ?? defaultExpected;


    const expectedAcc = expected.reduce((result, value, i) => {
        if (i === 0) return result;
        result[i] = result[i] + result[i - 1];
        return result;
    }, [...expected])

    const actualAcc = actual.reduce((result, value, i) => {
        if (i === 0) return result;
        result[i] = result[i] + result[i - 1];
        return result;
    }, [...actual])

    const datasets = [{
        type: 'line',
        label: 'Forventet',
        backgroundColor: CHART_BORDER_COLORS.blue,
        borderColor: CHART_BORDER_COLORS.blue,
        pointRadius: 0, // disable point drawing
        borderDash: [20, 20],
        data: accumulate ? expectedAcc : expected,
    }, {
        type: 'bar',
        label: 'Aktuel',
        backgroundColor: CHART_BORDER_COLORS.red,
        borderColor: CHART_BORDER_COLORS.red,
        data: accumulate ? actualAcc : actual,
    }]

    const c = changes[randomInt(changes.length - 1)]

    return (
        <Paper style={{width: '100%', height: '100%'}}>
            <Box
                ml={2}
                mr={2}
                display={'flex'}
                flex={1}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <h3>{c.text}</h3>
            </Box>
            <Divider/>
            {/*IMPORTANT DIV USED FOR CUSTOM TOOLTIP*/}
            <div>
                <Line
                    type={'line'}
                    plugins={[{
                        afterDraw: function (chart: any) {
                            drawDashLine(chart, chart.tooltip.caretX)
                        },
                    }]}
                    options={{
                        plugins: {
                            tooltip: {
                                enabled: false,
                                position: 'nearest',
                                external: externalTooltip
                            }
                        },
                        spanGaps: true,
                        interaction: {
                            mode: 'index',
                            intersect: false,
                        },
                        scales: {
                            xAxis: {
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 10
                                }
                            },
                            yAxis: {
                                suggestedMin: 0,
                            },
                        },

                    }}
                    data={{
                        labels: labels.map((l) => capitalize(l)),
                        datasets: datasets
                    }}
                />
            </div>
        </Paper>
    )
}

export const drawDashLine = (chart: any, x: number) => {
    const ctx = chart.ctx;
    const topY = chart.scales.yAxis.top;
    const bottomY = chart.scales.yAxis.bottom;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.lineTo(x, bottomY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#aaa';
    ctx.setLineDash([10, 10])
    ctx.stroke();
    ctx.restore();
}


const externalTooltip = (context: any) => {
    const {chart, tooltip} = context;
    const tooltipEl = getTooltipElement(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    render(<EffectChartTooltip tooltip={tooltip}/>, tooltipEl)

    // Display, position, and set styles for font
    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
    const isTooFarLeft = document.body.clientWidth - tooltip.caretX < 400
    const xOffset = isTooFarLeft ? -100 : 100;
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + xOffset + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
}

export const getTooltipElement = (chart: any) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
        tooltipEl.style.borderRadius = '3px';
        tooltipEl.style.color = 'white';
        tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .1s ease';

        const table = document.createElement('table');
        table.style.margin = '0px';

        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
};

export default EffectChart;