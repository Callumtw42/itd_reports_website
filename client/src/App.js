import React, { Component } from 'react';
import SalesReport from './js_modules/sales_report.js';
import './App.scss';
import BarChart from './js_modules/bar_chart.js';
import Table from './js_modules/table.js';

class HourlySalesReport extends SalesReport {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log("mount" + this.state.date.startDate + ' - ' + this.state.date.endDate);
    fetch(`/api/hourlySalesData/${this.state.date.startDate}/${this.state.date.startDate}`)
      .then(res => res.json())
      .then(salesData => this.setState({ salesData }, () => console.log('salesData fetched...', salesData)))
      .then(this.formatChartData)
      .catch((error) => {
        console.log(error)
      })

  }

  reRender(start, end) {
    this.setState({ date: { startDate: start, endDate: start } });
    fetch(`/api/hourlySalesData/${start}/${start}`)
      .then(res => res.json())
      .then(salesData => this.setState({ salesData }, () => console.log('salesData fetched...', salesData)))
      .then(this.formatChartData)
      .catch((error) => {
        console.log(error)
      });
  }

  getElementsWithSharedValue(objArr, key, value) {
    let elements = [];
    console.log(value);
   objArr.map(obj => {
      let currVal = Object.values(obj)[Object.keys(obj).indexOf(key)];
      console.log(currVal);
      if (currVal == value)
        elements.push(obj);
    });
    console.log(elements);
    return elements;
  }

  formatChartData = () => {
    
    let colors = this.state.salesData.map(saleCat => 'rgba(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + 0.6 + ')');
    let _totalSales = (this.state.salesData.length > 0) ? this.state.salesData.map(saleCat => saleCat.Sales).reduce(this.sum) - this.state.salesData.map(saleCat => saleCat.Refund).reduce(this.sum) : 0;
    let _labels = Array.from(Array(24).keys()).map(obj => { return ('0'+obj + ':00').slice(-5) });
    let _data = (this.state.salesData.length > 0) ? _labels.map(obj => { return (this.getElementsWithSharedValue(this.state.salesData, 'TillHour', obj).length >0) ? this.getElementsWithSharedValue(this.state.salesData, 'TillHour', obj).map(obj =>{return obj.Sales}).reduce(this.sum) : 0}): [0];
    console.log("_labels");

    this.setState({

      totalSales: _totalSales,

      chartData: {

        labels: _labels,
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

  render() {
    return (
      <div>
        <h1>{this.state.date.startDate + " - " + " Hourly Sales Breakdown"}</h1>
        <BarChart chartData={this.state.chartData} totalSales={this.state.totalSales} date={this.state.date} />
        <input id='startDate' type="date" title='start' max={this.todaysDate()} onChange={event => this.dateChange(event)}></input>
        <Table sales={this.state.salesData} />
      </div>
    );
  }

}


function App() {
  return (
    <div className="App">
      <section className='boxes'>
        <div className='box'> <SalesReport /></div>
        <div className='box'> <HourlySalesReport /></div>
      </section>
    </div>
  );
}

export default App;
