import React, { Component } from 'react';
import PieChart from './pie_chart.js';
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
      fetch(`/api/salesData/${this.state.date.startDate}/${this.state.date.endDate}`)
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

    colors(subArr){
      let colors =  [
        'rgba(0,0,0, 0.6)',
        'rgba(128,128,128, 0.6)',
        'rgba(128,128,0, 0.6)',
        'rgba(128,0,128, 0.6)',
        'rgba(128,0,0, 0.6)',
        'rgba(0,128,128, 0.6)',
        'rgba(0,128,0, 0.6)',
        'rgba(0,0,128, 0.6)',

        'rgba(255,255,255, 0.6)',
        'rgba(255,255,0, 0.6)',
        'rgba(255,0,255, 0.6)',
        'rgba(255,0,0, 0.6)',
        'rgba(0,255,255, 0.6)',
        'rgba(0,255,0, 0.6)',
        'rgba(0,0,255, 0.6)',

        'rgba(255,255,128, 0.6)',
        'rgba(255,128,255, 0.6)',
        'rgba(255,128,128, 0.6)',
        'rgba(128,255,255, 0.6)',
        'rgba(128,255,128, 0.6)',
        'rgba(128,128,255, 0.6)',

        'rgba(128,0,255, 0.6)',
        'rgba(0,128,255, 0.6)',
        'rgba(255,128,0, 0.6)',

        
        'rgba(64,64,64, 0.6)',
        'rgba(192,192,192, 0.6)',
        'rgba(192,192,64, 0.6)',
        'rgba(192,64,192, 0.6)',
        'rgba(192,64,64, 0.6)',
        'rgba(64,192,192, 0.6)',
        'rgba(64,192,64, 0.6)',
        'rgba(64,64,192, 0.6)',

        'rgba(255,255,64, 0.6)',
        'rgba(255,64,255, 0.6)',
        'rgba(255,64,64, 0.6)',
        'rgba(64,255,255, 0.6)',
        'rgba(64,255,64, 0.6)',
        'rgba(64,64,255, 0.6)',

        'rgba(255,255,192, 0.6)',
        'rgba(255,192,255, 0.6)',
        'rgba(255,192,192, 0.6)',
        'rgba(192,255,255, 0.6)',
        'rgba(192,255,192, 0.6)',
        'rgba(192,192,255, 0.6)',

        'rgba(192,64,255, 0.6)',
        'rgba(64,192,255, 0.6)',
        'rgba(255,192,64, 0.6)',


        'rgba(64,64,0, 0.6)',
        'rgba(64,0,64, 0.6)',
        'rgba(64,0,0, 0.6)',
        'rgba(0,64,64, 0.6)',
        'rgba(0,64,0, 0.6)',
        'rgba(0,0,64, 0.6)',

        'rgba(192,192,0, 0.6)',
        'rgba(192,0,192, 0.6)',
        'rgba(192,0,0, 0.6)',
        'rgba(0,192,192, 0.6)',
        'rgba(0,192,0, 0.6)',
        'rgba(0,0,192, 0.6)',


        'rgba(64,0,192, 0.6)',
        'rgba(0,64,192, 0.6)',
        'rgba(192,64,0, 0.6)',


        'rgba(102,51,0, 0.6)',
        'rgba(255,229,204, 0.6)',
        'rgba(255,153,153, 0.6)',
      ];
      return subArr.map(i => {return colors[colors.length - (i%colors.length)-1]});
    }

    totalSales(){
      return (this.state.salesData.length > 0) ? this.state.salesData.map(saleCat => saleCat.Sales).reduce(this.sum) - this.state.salesData.map(saleCat => saleCat.Refund).reduce(this.sum)  : 0;
    }
    getUniqueValues(objArr, key) {
      return [...new Set(objArr.map(i => {
        return Object.values(i)[Object.keys(i).indexOf(key)]
      }))];
    }
    formatChartData = () => {
      let _data = (this.state.salesData.length > 0) ? this.state.salesData.map(saleCat => saleCat.Sales) : [0];
      this.setState({
        totalSales: this.totalSales(),
        chartData: {
          labels: this.state.salesData.map(saleCat => saleCat.Department),
          datasets: [
            {
              label: 'Net Sales £',
              data: _data,
              backgroundColor: this.colors(this.getUniqueValues(this.state.salesData, 'Cat'))
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
          <h1>{this.state.date.startDate + " - " + this.state.date.endDate + " Session Sales Report"}</h1>
          <PieChart chartData={this.state.chartData} totalSales={this.state.totalSales} date={this.state.date} />
          <input id='startDate' type="date" title = 'start' max = {this.todaysDate()} onChange={event => this.dateChange(event)}></input>
          <input id='endDate' type="date" title = 'end' max = {this.todaysDate()} onChange={event => this.dateChange(event)}></input>
          <Table sales={this.state.salesData} />
        </div>
      );
    }
  }

  export default SalesReport;