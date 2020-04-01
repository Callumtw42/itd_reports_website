import 'chartjs-plugin-labels';
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
                    plugins: {
                      labels:
                      {
                        render: (data) => { return "" },
                        
                      }
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

  /* padding:10px 0px; */
}

.scroll-bar-wrap {
  /* // width: 300px; */
  display: flex;
  flex-direction: row;
  float: left;
  clear: left;
  position: relative;
  margin: 4em auto;
  margin: 0;
}

.scroll-bar-wrap >ul {
  /* // width: 300px; */
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
  /* -webkit-transition: all 0.5s; */
  opacity: 0;
}
/* MAGIC HAPPENS HERE */
.legend:hover .cover-bar {
  opacity: 1;
  -webkit-transition: all 0.5s;
}

.wrapper {
  /* padding: 10% 0 0 13%; */
  
  position: relative;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: left;
  /* // grid-template-columns: 80% 20%; */
}

.chart > canvas {
  min-width: 800px;
  margin: 30px 0 0 0;
  /* height: 2000px; */
}

.legend {
  margin: 0 0 0 0px;
  /* display: flex;
  flex-direction: row; */
  position: relative;
  align-content: left;
  /* // float: left;
  // margin: 0;
  // padding: 0;
  // float: left;
  // clear: left; */
  /* height: 500px; */
  overflow-y: hidden;
  overflow-x: scroll;

  /* // overflow: hidden; */
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
  /* padding: 20px 0 0 0; */
  margin: 8px 0 0 0;
}

.label {
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 48px;
}



 .chartjs-render-monitor{
  /* // position: relative; */
  /* // padding: -950px -950px 0 -950px; */
  /* // margin: auto; */
  width: 100;
}

/* Media Queries */
/* // @media (max-width: 1200px) {
//   .wrapper {
//     position: relative;
//     // height: auto;
//     display: inline-block;
//   }

//   .legend {
//     display: none;
//   }
// } */

// /* Media Queries */
/* // @media (max-width: 1200px) {
//   .wrapper {
//     position: relative;
//     // height: auto;
//     display: inline-block;
//   }

//   .legend {
//     display: none;
//   }
// } */

`

export default BarChart;
