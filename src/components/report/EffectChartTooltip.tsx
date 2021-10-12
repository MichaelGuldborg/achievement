import React from "react";


export interface TooltipType {
    title: string[],
    body: { lines: string[] }[],
    labelColors: { backgroundColor: string; borderColor: string }[]
    dataPoints: {
        dataset: {
            label: string
            backgroundColor: string,
            borderColor: string,
        },
        label: string,
        dataIndex: number,
        raw: number
    }[]
}


export const EffectChartTooltip: React.FC<{ tooltip: TooltipType, }> = ({tooltip}) => {


    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: "start", flexDirection: 'column'}}>
            <div>
                {tooltip.title}
            </div>
            <div>
                {tooltip.dataPoints.map((datapoint, i) => {
                    return (
                        <div>
                            <span style={{
                                display: 'inline-block',
                                width: 10,
                                height: 10,
                                background: datapoint.dataset.backgroundColor,
                                borderColor: datapoint.dataset.borderColor,
                                borderWidth: 2,
                                marginRight: 10,
                            }}/>
                            {datapoint.dataset.label}: {datapoint.raw}
                        </div>
                    )
                })}

                {tooltip.dataPoints.length !== 2 ? <span/> :
                    <div>
                    <span style={{
                        display: 'inline-block',
                        width: 10,
                        height: 10,
                        background: 'transparent',
                        borderColor: 'transparent',
                        borderWidth: 2,
                        marginRight: 10,
                    }}/>
                        Forskel: {tooltip.dataPoints[1].raw - tooltip.dataPoints[0].raw}
                    </div>
                }

            </div>
        </div>
    )
}

export default EffectChartTooltip;