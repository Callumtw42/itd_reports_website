import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import Chart from './chart.js';
import "../css_modules/chart.scss";

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
    return <ul>{legendItems}</ul>;
  }

  render() {
    if (this.props.chartData.datasets !== undefined)
      return (
        <div className="wrapper">
          <div className="chart">
            <Pie
              data={this.props.chartData}
              options={
                {
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

export default PieChart;
