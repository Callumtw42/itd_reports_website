import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import styled from "styled-components/macro";
import * as f from './functions.js';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function labelSize() {
  return f.viewport(12, 26);
}

export default function BarChart(props) {

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  // const [chart, setChart] = useState(chart());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
      console.log(windowDimensions);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  function legend() {
    let key = 0;
    let colorStrings = props.chartData.datasets.map(i => { return [...new Set(i.backgroundColor)] });
    let labels = props.chartData.datasets.map(i => { return [...new Set(i.label)] });
    let legendItems = colorStrings.map(c => {
      return <div key={key++} className='legendItem'>
        <span key={key++} className="dot" style={{ backgroundColor: c }}></span>
        <label key={key++} className="label" >{labels[colorStrings.indexOf(c)]}</label>
      </div>

    }).reverse();
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
                          var percent = item.data[tooltipItem.index] / props.totalSales * 100;
                          percent = percent.toFixed(2); // make a nice string
                          sales = sales.toFixed(2);
                          if (item.data[tooltipItem.index] > 0)
                            return '£ ' + sales + ' (' + percent + '%)';
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

.legend::-webkit-scrollbar {
  float: left;
  clear: left;
  width: 0.4em;
}
.legend::-webkit-scrollbar,
.legend::-webkit-scrollbar-thumb {
  float: left;
  clear: left;
  overflow: visible;
  border-radius: 4px;
}
.legend::-webkit-scrollbar-thumb {
  float: left;
  clear: left;
  background: rgba(0, 0, 0, 0.2);
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
  -webkit-transition: all 0.5s;
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
  scrollbar-width: thin;
  -webkit-scrollbar {
    display: none;
  }
}

.dot {
  overflow-x: hidden;
  float: left;
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

} 

`;

// export default BarChart;
