import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import Chart from './chart.js';
import styled from 'styled-components/macro';
import * as f from './functions.js';

export default function PieChart(props) {

  // const [legend, setLegend] = useState(<div>TEST</div>)

  let defaultProps = {
    displayTitle: false,
    displayLegend: false,
    location: 'City',
  }

  // useEffect(() => {
  //   // console.log(createLegend());
  //   if (!Object.is(createLegend().toString(), legend.toString())) {
  //     setLegend(<div>XXX</div>);
  //     console.log("update")
  //   }
  // });

  function createLegend() {
    if (f.notEmpty(props.chartData.datasets)) {
      console.log("YESS")
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
                    bodyFontSize: 32,
                    mode: 'index',
                    callbacks: {
                      label: (tooltipItem, data) => {
                        var label = data.labels[tooltipItem.index];
                        return label;
                      },
                      afterLabel: (tooltipItem, data) => {
                        var sales = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        var percent = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / props.totalSales * 100;
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
  max-width: 800px;
  /* margin: 30px 0 0 0; */
  margin: 50px auto ;
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


// export default PieChart;
