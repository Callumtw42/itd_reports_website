import React from 'react';
import { ChartData, DataSet, colors, toInt, formatChartData } from "./logic"
import { Bar } from 'react-chartjs-2';
import styled from "styled-components/macro";
import * as f from '../../../functions';
import Div from "./style"
import { useState, useEffect } from 'react';
import * as d from "../../datafns"
import { TooltipProps } from '@material-ui/core';
// import { toInt } from '../logic';

function labelSize() {
  return f.viewport(12, 26);
}

export default function StackedBarChart(props: { className?: string, data: d.obj[], x: string[], groupBy: string, values: string }) {

  let { data, x, groupBy, values } = props
  let chartData: ChartData = formatChartData(data, x, groupBy, values)
  let total = d.sumColumn(data, values)


  function legend() {
    let key = 0;
    let colorStrings = chartData.datasets.map(i => { return i.backgroundColor });
    let labels = chartData.datasets.map(i => { return i.label });
    let legendItems = colorStrings.map(c => {
      return <div key={key++} className='legendItem'>
        <span key={key++} className="dot" style={{ backgroundColor: c }}></span>
        <label key={key++} className="label" >{labels[colorStrings.indexOf(c)]}</label>
      </div>
    })
    return <div className="scroll-bar-wrap">
      <ul>{legendItems}</ul>
      <div className="cover-bar"></div>
    </div>;
  }

  function chart(labelSize: number, toolTipSize: number) {
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
                        // fontSize: 24
                      },
                      fullWidth: true
                    },
                    tooltips: {
                      bodyFontSize: toolTipSize,
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
                          // sales = sales.toFixed(2);
                          if (item.data[tooltipItem.index] > 0)
                            return (!Number.isInteger(sales)) ? '£ ' + sales.toFixed(2) + ' (' + percentString + '%)' : sales + ' (' + percentString + '%)';
                          else return '';
                        }
                      },
                      // fontSize: 48
                    }
                  }
                }
              />
            </div>
            <div className='legend'>{legend()}</div>
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

  return chart(labelSize(), f.viewport(12, 32));
}
