import './style.scss';

import React from 'react';
import { Line } from 'react-chartjs-2';

export default function LineChart({ data }) {
    return (
        <div className="BarChart">
            <div className="chart">
                <Line
                    data={data}
                    options={{
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                stacked: true,
                            },
                            ],
                            yAxes: [{
                                stacked: true,
                            }]
                        }
                    }
                    }
                />
            </div>
        </div>

    )
}
