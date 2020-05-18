import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from "styled-components/macro";
import * as f from './functions.js';

import { useState, useEffect } from 'react';
import useDataFunctions from "./report/data_functions"

function labelSize() {
  return f.viewport(12, 26);
}

//Next: refactor charts to accept data objects and columns instead of arrays
export function useStackedBarChart(
  x,
  y,
  z,
  data,
  xTotal,
) {

  const {
    notEmpty,
    getColumn,
    sumColumn,
    setColumn,
    addColumn,
    removeColumns,
    sumAndGroup,
    getUniqueValues,
    getElementsWithValue
  } = useDataFunctions();

  const [chartData, setChartData] = useState({});


  function idToName(groupBy) {
    switch (groupBy) {
      case 'Id': return 'Product';
      case 'Cat': return 'Category';
      case 'AssocProdID': return 'PriceMark';
      default: return groupBy;
    }
  }

  function formatChartData(
    x,
    y,
    z,
    data,
  ) {

    let stacks = getUniqueValues(data, z);
    let stackNames = getUniqueValues(data, idToName(z));

    let dataSets = stacks.map((stack, index) => {
      let color = f.colors([stack])[0];
      return {
        label: stackNames[stacks.indexOf(stack)],
        data: x.map((t) => {
          let atHour = getElementsWithValue(data, 'TillHour', t);
          let withCategory = getElementsWithValue(atHour, z, stack);
          return notEmpty(withCategory) ? getColumn(withCategory, y).reduce((acc, n) => acc + n) : 0;
        }),
        backgroundColor: color,
        datasetKeyProvider: index
      }
    });

    return {
      labels: x,
      datasets: dataSets
    };
  }

  function StackedBarChart() {
    return <BarChart className='chart' chartData={formatChartData(x, y, z, data)} xTotal={xTotal} ></BarChart>
  }

  return {
    chartData,
    setChartData,
    idToName,
    formatChartData,
    StackedBarChart
  }

}

export default function BarChart(props) {

  function legend() {
    let key = 0;
    let colorStrings = props.chartData.datasets.map(i => { return i.backgroundColor });
    let labels = props.chartData.datasets.map(i => { return i.label });
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

  function chart(labelSize, toolTipSize) {
    if (props.chartData.datasets !== undefined)
      return (
        <Div>
          <div className="wrapper">
            <div className="chart">
              <Bar
                data={props.chartData}
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
                        label: (tooltipItem, data) => {
                          let item = data.datasets[tooltipItem.datasetIndex]
                          var label = item.label;
                          if (item.data[tooltipItem.index] > 0)
                            return label;
                          else return '';
                        },
                        afterLabel: (tooltipItem, data) => {
                          let item = data.datasets[tooltipItem.datasetIndex]
                          var sales = item.data[tooltipItem.index];
                          var percent = item.data[tooltipItem.index] / props.xTotal * 100;
                          percent = percent.toFixed(2); // make a nice string
                          // sales = sales.toFixed(2);
                          if (item.data[tooltipItem.index] > 0)
                            return (!Number.isInteger(sales)) ? '£ ' + sales.toFixed(2) + ' (' + percent + '%)' : sales + ' (' + percent + '%)';
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
          data={props.chartData}
        />
      </div>

    )

  }

  return chart(labelSize(), f.viewport(12, 32));


}

const Div = styled.div`
.legendItem {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  padding: 0 1em;
  float: left;
  clear: left;
}

.scroll-bar-wrap {
  display: flex;
  flex-direction: row;
  float: left;
  clear: left;
  position: relative;
  margin: 4em auto;
  margin: 0;
}

.scroll-bar-wrap >ul {
  display: flex;
  flex-direction: row;
}

.cover-bar {
  position: absolute;
  background: rgb(255, 255, 255);
  height: 100%;
  top: 0;
  right: 0;
  width: 0.4em;
  opacity: 0;
}
.legend:hover .cover-bar {
  opacity: 1;
}

.wrapper {
  position: relative;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: left;
}

.chart > canvas {
  margin: 0;
}

.legend {
  margin: 0 0 0 0px;
  position: relative;
  align-content: left;
  overflow-y: hidden;
  overflow-x: scroll;
}

.dot {
  overflow-x: hidden;
  clear: left;
  height: 3em;
  width: 3em;
  border-radius: 50%;
  display: inline-block;
  margin: auto 0;
}

.label {
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 3em;
}



 .chartjs-render-monitor{
  width: 100;
}

@media (min-width:64em){

  .dot {
  height: 1em;
  width: 1em;
}

.scroll-bar-wrap >ul {

  flex-direction: column;
}

.label {
  font-size: 1em;
}

.legendItem {
  padding: 0 0.25em;
}

.chart > canvas {
  /* min-width: 50%; */
  margin: auto;
}

.chart{
  min-width: 50%;
}
.legend {
  margin: 0 0 0 0px;
  position: relative;
  align-content: left;
  overflow-y: scroll;
  overflow-x: hidden;
}

.wrapper {
  position: relative;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-height: 45vh;
}

} 

`;

