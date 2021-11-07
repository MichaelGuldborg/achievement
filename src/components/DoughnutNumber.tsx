import {Doughnut} from "react-chartjs-2/dist";
import React from "react";

const tcolor = [
    '#e74c3c',
    '#ee5d38',
    '#f46e34',
    '#f87f31',
    '#fc8f2f',
    '#f29c23',
    '#e6a81b',
    '#d8b41b',
    // '#b8bd24',
    '#94c439',
    '#6cc954',
    '#2ecc71'
]

export const DoughnutNumber: React.FC<{
    value: number,
    max: number
}> = ({max, value}) => {
    return (
        <div style={{
            position: 'relative',
            // marginTop: '-20px',
            marginBottom: '-20px',
        }}>
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translate(-50%, 0)',
                fontSize: 40,
                fontWeight: 600,
                marginBottom: 10,
            }}>
                {value}
            </div>
            <Doughnut
                style={{}}
                type={'doughnut'}
                data={{
                    labels: [],
                    datasets: [
                        {
                            label: '',
                            data: [value, max - value],
                            borderWidth: 5,
                            backgroundColor: [
                                tcolor[value % tcolor.length],
                                '#e0e0e0',
                            ],
                            borderColor: [
                                'rgba(255, 255, 255 ,1)',
                                'rgba(255, 255, 255 ,1)',
                                'rgba(255, 255, 255 ,1)'
                            ],
                        }
                    ]
                }}
                options={{
                    rotation: 270,
                    circumference: 180,
                    legend: {
                        display: false
                    },
                    plugins: {
                        tooltip: {
                            enabled: false,
                        }
                    },
                }}
            />
        </div>

    )
}