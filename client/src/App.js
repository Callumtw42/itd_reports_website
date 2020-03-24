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
    fetch(`/api/hourlySalesData/${this.state.date.startDate}/${this.state.date.startDate}`)
      .then(res => res.json())
      .then(salesData => this.setState({ salesData }, () => {
        console.log('salesData fetched...', salesData);
        if (salesData.length > 0)
          this.setState({ dataFetched: true });
        else this.setState({ dataFetched: false });
      }))
      .then(this.formatChartData)
      .then(salesData => () => { if (salesData.length > 0) this.setState({ dataFetched: true }) })
      .catch((error) => {
        console.log(error)
      })

  }

  reRender(start, end) {
    this.setState({ date: { startDate: start, endDate: start } });
    fetch(`/api/hourlySalesData/${start}/${start}`)
      .then(res => res.json())
      .then(salesData => this.setState({ salesData }, () => {
        console.log('salesData fetched...', salesData);
        if (salesData.length > 0)
          this.setState({ dataFetched: true });
        else this.setState({ dataFetched: false });
      }))
      .then(this.formatChartData)
      .then(salesData => () => { })
      .catch((error) => {
        console.log(error)
      });
  }

  getElementsWithValue(objArr, key, value) {
    let elements = [];
    objArr.map(obj => {
      let currVal = Object.values(obj)[Object.keys(obj).indexOf(key)];
      if (currVal == value)
        elements.push(obj);
    });
    return elements;
  }



  formatChartData = () => {
    let key = 0;
    let _labels = Array.from(Array(24).keys()).map(obj => { return ('0' + obj + ':00').slice(-5) });
    let departments = this.getUniqueValues(this.state.salesData, 'Department');
    let categories = this.getUniqueValues(this.state.salesData, 'Cat');

    let _datasets =
      departments.map(o => {
        let colors = [];
        return {
          label: o,
          //for each category
          data: _labels.map(i => {
            colors.push([categories[departments.indexOf(o)]])
            let salesAtTime = this.getElementsWithValue(this.getElementsWithValue(this.state.salesData, 'Department', o), 'TillHour', i).map(j => { return j.Sales });
            // console.log(salesAtTime);
            return (salesAtTime.length > 0) ? salesAtTime.reduce(this.sum) : 0;
          }),
          backgroundColor: this.colors(colors),
          datasetKeyProvider: key++
        }
      });

    this.setState({

      totalSales: this.totalSales(),

      chartData: {

        labels: _labels,
        datasets: _datasets
      }
    });
  }

  bar() {
    return (this.state.dataFetched) ? <BarChart chartData={this.state.chartData} totalSales={this.state.totalSales} date={this.state.date} /> : <div></div>
  }

  render() {
    return (
      <div>
        <h1>{this.state.date.startDate + " - " + " Hourly Sales Breakdown"}</h1>
        {this.bar()}
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
