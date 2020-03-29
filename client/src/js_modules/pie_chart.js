import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import Chart from './chart.js';
import styled from 'styled-components/macro';

class PieChart extends Chart {

  legend() {
    let key = 0;
    let colorStrings = this.props.chartData.datasets[0].backgroundColor;
    let labels = this.props.chartData.labels
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

  render() {
    if (this.props.chartData.datasets !== undefined)
      return (
        <Div>
          <div className="wrapper">
            <div className="chart">
              <Pie
                height={1} width={1}
                data={this.props.chartData}
                options={
                  {
                    layout: {
                      padding: {
                        // left: -150,
                        // right: -300
                      }
                    },
                    plugins: {
                      labels:
                      {
                        render: (data) => { return "" },
                        // fontSize: 24,
                      }
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
                      mode: 'index',
                      callbacks: {
                        label: (tooltipItem, data) => {
                          var label = data.labels[tooltipItem.index];
                          return label;
                        },
                        afterLabel: (tooltipItem, data) => {
                          var sales = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                          var percent = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / this.props.totalSales * 100;
                          percent = percent.toFixed(2); // make a nice string
                          return '£ ' + sales + ' (' + percent + '%)';
                        }
                      },
                      fontSize: 24
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
        <Pie
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
  float: left;
  clear: left;

  /* padding:10px 0px; */
}

.scroll-bar-wrap {
  /* // width: 300px; */
  float: left;
  clear: left;
  position: relative;
  margin: 4em auto;
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
  padding: 10% 0 0 13%;
  
  position: relative;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* // grid-template-columns: 80% 20%; */
}

.chart {
  width: 500px;
  height: 500px;
}

.legend {
  margin: 0 0 0 0px;
  /* // display: block; */
  position: relative;
  align-content: left;
  /* // float: left;
  // margin: 0;
  // padding: 0;
  // float: left;
  // clear: left; */
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;

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

export default PieChart;
