import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import "../css_modules/chart.scss";
import Chart from './chart.js'

class BarChart extends Chart {

  render() {
    if (this.props.chartData.datasets !== undefined)
      return (
        <div className="wrapper">
          <div className = "chart">
            <Bar
              data={this.props.chartData}
              options={
                {
                  scales: {
                    xAxes: [{
                      stacked: true
                    }],
                    yAxes: [{
                      stacked: true
                    }]
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
                    position: 'right',
                    align: 'center',
                    labels: {
                      usePointStyle: true,
                      // fontSize: 24
                    },
                    fullWidth: true

                  },
                  tooltips: {
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
                    fontSize: 24
                  }
                }
              }
            />
          </div>
          <div className = 'legend'>{this.legend()}</div>
        </div>
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

export default BarChart;
