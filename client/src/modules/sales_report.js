import React, { Component } from 'react';
import Chart from './chart.js';
import Table from './table.js';

class SalesReport extends Component {
    constructor() {
      super();
      this.state = {
        salesData: [],
        chartData: {},
        totalSales: 0,
        date: { startDate: this.todaysDate(), endDate: this.todaysDate(), }
      };
    }
  
    todaysDate() {
      var today = new Date();
      var date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + today.getDate();
      return date;
    }
  
    componentDidMount() {
      console.log("mount" + this.state.date.startDate + ' - ' + this.state.date.endDate);
      fetch(`/api/salesData/${this.state.date.startDate}/${this.state.date.startDate}`)
        .then(res => res.json())
        .then(salesData => this.setState({ salesData }, () => console.log('salesData fetched...', salesData)))
        .then(this.formatChartData)
        .catch((error) => {
          console.log(error)
        })
    }
  
    reRender(start, end) {
      this.setState({ date: { startDate: start, endDate: end } });
      fetch(`/api/salesData/${start}/${end}`)
        .then(res => res.json())
        .then(salesData => this.setState({ salesData }, () => console.log('salesData fetched...', salesData)))
        .then(this.formatChartData)
        .catch((error) => {
          console.log(error)
        });
    }
  
    sum = (total, n) => {
      return total + n
    }
  
    formatChartData = () => {
      let colors = this.state.salesData.map(saleCat => 'rgba(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + 0.6 + ')');
      let _totalSales = (this.state.salesData.length > 0) ? this.state.salesData.map(saleCat => saleCat.Sales).reduce(this.sum) - this.state.salesData.map(saleCat => saleCat.Refund).reduce(this.sum)  : 0;
      let _data = (this.state.salesData.length > 0) ? this.state.salesData.map(saleCat => saleCat.Sales) : [0];
  
      this.setState({
  
        totalSales: _totalSales,
  
        chartData: {
  
          labels: this.state.salesData.map(saleCat => saleCat.Department),
          datasets: [
            {
              label: 'Net Sales £',
              data: _data,
              backgroundColor: colors
            }
          ]
        }
      });
    }
  
    dateChange(event) {
      console.log(event.target.value);
      let caller = event.target;
      let newDate = caller.value;
      if (caller.id === 'startDate') {
        // console.log("re-render" + newDate);
        // this.setState({ date: { startDate: caller.value } });
        this.reRender(newDate, this.state.date.endDate);
      }
      else if (caller.id === 'endDate') {
        // this.setState({date:{ endDate: caller.value }});
        this.reRender(this.state.date.startDate, newDate);
      }
    };
  
    render() {
      return (
        <div>
          { /*   <h2>salesData</h2>
       <ul>
            {this.state.salesData.map(salesData =>
              <li key={salesData.Department}>{salesData.Department} {salesData.Sales}</li>
            )}
          </ul>
         */ }
          <Chart chartData={this.state.chartData} totalSales={this.state.totalSales} date={this.state.date} />
          <input id='startDate' type="date" onChange={event => this.dateChange(event)}></input>
          <input id='endDate' type="date" onChange={event => this.dateChange(event)}></input>
          <Table sales={this.state.salesData} />
        </div>
      );
    }
  }

  export default SalesReport;