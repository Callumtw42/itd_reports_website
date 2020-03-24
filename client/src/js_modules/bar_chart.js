import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-labels';

class BarChart extends Component {

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
    location: 'City',

  }

  render() {
    return (
      <div className="chart">
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
                      return '£ ' + sales + ' (' + percent + '%' + ')';
                    else return '';
                  }
                },
                fontSize: 24
              }
            }
          }
        />
        {/* <p>{new String(this.state.chartData.datasets.map(i => { return i.backgroundColor }))}</p> */}
        <h1>Total: £{this.props.totalSales.toFixed(2)}</h1>
      </div>

    )
  }
}

export default BarChart;
