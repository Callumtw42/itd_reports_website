import React from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components/macro';
import * as f from './functions.js';

export  function usePieChart(x, labels, colors, total) {



  function formatChartData(x, labels, colors) {
    return {
      labels: labels,
      datasets: [
        {
          label: 'Net Sales £',
          data: x,
          backgroundColor: f.colors(colors)
        }
      ]
    };
  }

  function CustomPieChart() {
    return <PieChart className='chart' chartData={formatChartData(x, labels, colors)} total={total} ></PieChart>
  }

  return {
    CustomPieChart
  }

}


export default function PieChart(props) {

  function createLegend() {
    if (f.notEmpty(props.chartData.datasets)) {
      let chartData = props.chartData;
      let key = 0;
      let colorStrings = chartData.datasets[0].backgroundColor;
      let labels = props.chartData.labels
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
    else return <div>AWW</div>
  }

  function chart(toolTipSize) {
    if (props.chartData.datasets !== undefined)
      return (
        <Div>
          <div className="wrapper">
            <div className="chart">
              <Pie
                height={1} width={1}
                data={props.chartData}
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
                        label: (tooltipItem, data) => {
                          var label = data.labels[tooltipItem.index];
                          return label;
                        },
                        afterLabel: (tooltipItem, data) => {
                          var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                          var percent = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / props.total * 100;
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

            <div className='legend'>{createLegend()}</div>
          </div>
        </Div>
      )
    else return (
      <div className="chart">
        <Pie
          data={props.chartData}
        />
      </div>
    )
  }


  return chart(f.viewport(12, 32));

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
  /* max-width: 500px; */
  /* margin: 0px auto ; */
}

.legend {
  margin: 0 0 0 0px;
  position: relative;
  align-content: left;
  overflow-y: hidden;
  overflow-x: scroll;
  scrollbar-width: thin;
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

.label {
font-size: 1em;
}

.legendItem {
padding: 0 0.25em;
}

/* Inline #9 | http://localhost:3000/ */

.scroll-bar-wrap > ul {
  /* flex-direction: row; */
  flex-direction: column;
}

.wrapper {
  flex-direction: row;
  justify-content: center;
  max-height: 45vh;
}

.chart > canvas {
  min-width: 45vh;
min-height: 45vh;
    /* margin: 0 auto; */
  }

  .legend{
    overflow-y: scroll;
    overflow-x: hidden;
  }



} 


`
