import '../style.scss';

import React, { useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import * as u from "../../../utils"
import * as R from "rambda"

import { getLabelSize } from './logic';

function encode(data: Object) {
  const string = JSON.stringify(data).toString();
  const split = string.split("")
  let acc = 0;
  split.forEach(s => acc += s.charCodeAt(0))
  return acc;
}

const StackedBarChart = (props: { data }) => {
  const { data } = props;
  let labelSize = getLabelSize()

  return <div className="BarChart">
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
}

export default StackedBarChart;