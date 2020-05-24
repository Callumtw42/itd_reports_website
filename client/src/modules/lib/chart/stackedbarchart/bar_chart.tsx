import React from 'react';
import { Bar } from 'react-chartjs-2';

import * as d from '../../datafns';
import Legend from './legend';
import { ChartData, formatChartData, getLabelSize, viewport } from './logic';
import Div from './style';

export default function StackedBarChart(props: { className?: string, data: d.obj[], x: string[], groupBy: string, values: string }) {

  let { data, x, groupBy, values } = props
  let chartData: ChartData = formatChartData(data, x, groupBy, values)
  let total = d.sumColumn(data, values)
  let labelSize = getLabelSize()

  if (chartData.datasets !== undefined)
    return (
      <Div>
        <div className="wrapper">
          <div className="chart">
            <Bar
              data={chartData}
              options={
                {
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
                  },
                  labels: {
                    display: false,
                    fontSize: 48
                  },
                  legend: {
                    display: false,
                    position: 'right',
                    align: 'center',
                    labels: {
                      usePointStyle: true,
                    },
                    fullWidth: true
                  },
                  tooltips: {
                    bodyFontSize: viewport(12, 32),
                    mode: 'single',
                    callbacks: {
                      label: (tooltipItem: any, data: ChartData) => {
                        let item = data.datasets[tooltipItem.datasetIndex]
                        var label = item.label;
                        if (item.data[tooltipItem.index] > 0)
                          return label;
                        else return '';
                      },
                      afterLabel: (tooltipItem: any, data: ChartData) => {
                        let item = data.datasets[tooltipItem.datasetIndex]
                        var sales = item.data[tooltipItem.index];
                        var percent: number = item.data[tooltipItem.index] / total * 100;
                        var percentString = percent.toFixed(2); // make a nice string
                        if (item.data[tooltipItem.index] > 0)
                          return (!Number.isInteger(sales)) ? '£ ' + sales.toFixed(2) + ' (' + percentString + '%)' : sales + ' (' + percentString + '%)';
                        else return '';
                      }
                    },
                  }
                }
              }
            />
          </div>
          <div className='legend'><Legend chartData={chartData} /></div>
        </div>
      </Div>
    )
  else return (
    <div className="chart">
      <Bar
        data={chartData}
      />
    </div>
  )

}
