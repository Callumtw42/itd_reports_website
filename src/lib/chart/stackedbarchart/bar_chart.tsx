import '../style.scss';

import React from 'react';
import { Bar } from 'react-chartjs-2';

import { getLabelSize } from './logic';

export default function StackedBarChart({ data }) {
  let labelSize = getLabelSize()
  return (
    <div className="BarChart">
      <div className="chart">
        <Bar
          data={data}
          options={{
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                stacked: true,
                ticks:
                {
                  fontSize: labelSize
                },
              },
              ],
              yAxes: [{
                stacked: true,
                ticks:
                {
                  fontSize: labelSize
                }
              }]
            }
          }
          }
        />
      </div>
    </div>

  )
}
