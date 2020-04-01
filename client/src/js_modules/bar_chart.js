
import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from "styled-components/macro";
import Chart from './chart.js';

class BarChart extends Chart {

  render() {
    if (this.props.chartData.datasets !== undefined)
      return (
        <Div>
          <div className="wrapper">
            <div className="chart">
              <Bar
                data={this.props.chartData}
                options={
                  {
                    scales: {
                      xAxes: [{
                        stacked: true,
                        ticks:
                        {
                          fontSize:26
                        }
                      }],
                      yAxes: [{
                        stacked: true,
                        ticks:
                        {
                          fontSize:26
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
                      bodyFontSize: 32,
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
                          var percent = item.data[tooltipItem.index] / this.props.totalSales * 100;
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
            <div className='legend'>{this.legend()}</div>
          </div>
        </Div>
      )

    else return (
      <div className="chart">
        <Bar
          data={this.props.chartData}
        />
      </div>

    )
  }
}

const Div = styled.div`
.legendItem {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  padding: 0 20px;
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
  min-width: 800px;
  margin: 0px 0 0 0;
}

.legend {
  margin: 0 0 0 0px;
  position: relative;
  align-content: left;
  overflow-y: hidden;
  overflow-x: scroll;
  -webkit-scrollbar {
    display: none;
  }
}

.dot {
  overflow-x: hidden;
  float: left;
  clear: left;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  display: inline-block;
  margin: 8px 0 0 0;
}

.label {
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 48px;
}



 .chartjs-render-monitor{
  width: 100;
}

@media (min-width:64em){
  .legendItem {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  padding: 0 20px;
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
  /* min-width: 200px; */
  /* width: 100%; */
  margin: 0px 0 0 0;
}

.legend {
  margin: 0 0 0 0px;
  position: relative;
  align-content: left;
  overflow-y: hidden;
  overflow-x: scroll;
  -webkit-scrollbar {
    display: none;
  }
}

.dot {
  overflow-x: hidden;
  float: left;
  clear: left;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  display: inline-block;
  margin: 8px 0 0 0;
}

.label {
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 48px;
}



 .chartjs-render-monitor{
  /* width: 100; */
}
} 

`

export default BarChart;
