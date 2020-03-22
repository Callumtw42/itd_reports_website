import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chartjs-plugin-labels';

class Chart extends Component {

    static defaultProps = {
      displayTitle: true,
      displayLegend: true,
      legendPosition: 'right',
      location: 'City',
  
    }
  
    render() {
      return (
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
                title: {
                  display: this.props.displayTitle,
                  text: this.props.date.startDate + " - " + this.props.date.endDate + " Session Sales Report",
                  fontSize: 25
                },
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
                      return '£ ' + sales + ' (' + percent + '%' + ')';
                    }
                  },
                  fontSize: 24
                }
              }
            }
          />
          <h1>Total: £{this.props.totalSales.toFixed(2)}</h1>
        </div>
  
      )
    }
  }

  export default Chart;
  