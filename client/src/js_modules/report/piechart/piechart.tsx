import React from 'react';
import { Pie } from 'react-chartjs-2';
import styled, { ThemeConsumer } from 'styled-components';
import { obj } from '../data.js';
import useDataFuntions from '../data_functions'
import * as _ from "./piechart_logic"
import "./piechart.scss"

const { ...d } = useDataFuntions()

export default function usePieChart(data: obj[], values: string, groupBy: string) {

  let grouped = d.sumAndGroup(data, groupBy);
  let x: number[] = d.getColumn(grouped, values) as number[]
  let labels: string[] = d.getColumn(grouped, groupBy) as string[]
  let colorIds: number[] = d.notEmpty(data) ? labels.map(s => { return _.toInt(s) }) : []
  let chartData: _.ChartData = _.formatChartData(x, labels, colorIds)

  function Legend() {
    if (d.notEmpty(chartData.datasets)) {
      let colorStrings = chartData.datasets[0].backgroundColor;
      let labels = chartData.labels
      let legendItems = colorStrings.map((c: string, key: number) => {
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
    else return <div></div>
  }

  function PieChart() {
    let total = x.reduce((acc, n) => { return acc + n })
    let toolTipSize = _.viewport(12, 32)
    if (d.notEmpty(chartData.datasets))
      return (
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
            <div className='legend'><Legend/></div>
          </div>
      )
    else return (
      <div className="chart">
        <Pie
          data={chartData}
        />
      </div>
    )
  }
  return PieChart
}