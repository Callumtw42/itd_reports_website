import React from 'react';
import { Pie } from 'react-chartjs-2';

import * as d from '../../datafns';
import Legend from './legend';
import * as _ from './logic';
import Div from './style';

export default function PieChart(props: { data: d.obj[], groupBy: string, values: string }) {
  let grouped = d.sumAndGroup(props.data, props.groupBy);
  let x: number[] = d.getColumn(grouped, props.values) as number[]
  let labels: string[] = d.getColumn(grouped, props.groupBy) as string[]
  let colorIds: number[] = d.notEmpty(props.data) ? labels.map(s => { return _.toInt(s) }) : []
  let chartData: _.ChartData = _.formatChartData(x, labels, colorIds)
  let total = x.reduce((acc, n) => { return acc + n })
  let toolTipSize = _.viewport(12, 32)
  if (d.notEmpty(chartData.datasets))
    return (
      <Div>
        <div className="wrapper">
          <div className="chart">
            <Pie
              height={1} width={1}
              data={chartData}
              options={
                {
                  layout: {
                  },
                  labels: { display: false },
                  legend: {
                    display: false,
                    position: 'top',
                    align: 'center',
                    labels: {
                      usePointStyle: true,
                      fontSize: 24
                    },
                    fullWidth: true
                  },
                  tooltips: {
                    bodyFontSize: toolTipSize,
                    mode: 'index',
                    callbacks: {
                      label: (tooltipItem: any, data: _.ChartData) => {
                        var label = data.labels[tooltipItem.index];
                        return label;
                      },
                      afterLabel: (tooltipItem: any, data: _.ChartData) => {
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        var percent: number | string = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / total * 100;
                        percent = percent.toFixed(2); // make a nice string
                        return (!Number.isInteger(value)) ? '£ ' + value.toFixed(2) + ' (' + percent + '%)' : value + ' (' + percent + '%)';
                      }
                    },
                    fontSize: 24
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
      <Pie
        data={chartData}
      />
    </div>
  )
}