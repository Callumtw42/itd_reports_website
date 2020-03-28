import React from 'react';
import BarChart from './bar_chart.js';
import Table from './table.js';
import SalesReport from './sales_report.js';


class SalesByHour extends SalesReport {
  constructor() {
    super();
    this.state.date = this.todaysDate();
  }

  componentDidMount() {
    this.getData(this.todaysDate());
  }

  getData(date) {
    super.getData(`/api/hourlySalesData/${date}`);
  }


  dateChange(event) {
    console.log(event.target.value);
    let caller = event.target;
    let newDate = caller.value;
    if (caller.id === 'startDate') {
      this.getData(newDate);
    }
  };

  formatTableData(data) {

    this.setState({ tableData: this.removeColumns(data, 'Cat', 'TillDate', 'TillHour') })
  }

  formatChartData = (salesData) => {
    let _labels = Array.from(Array(24).keys()).map(obj => { return ('0' + obj + ':00').slice(-5) });
    if (salesData.length > 0) {
      let key = 0;
      let departments = this.getUniqueValues(salesData, 'Department');
      let categories = this.getUniqueValues(salesData, 'Cat');

      let _datasets =
        departments.map(o => {
          let colors = [];
          return {
            label: o,
            data: _labels.map(i => {
              colors.push([categories[departments.indexOf(o)]])
              let salesAtTime = this.getElementsWithValue(this.getElementsWithValue(salesData, 'Department', o), 'TillHour', i).map(j => { return j.Sales });
              return this.sum(salesAtTime);
            }),
            backgroundColor: this.colors(colors),
            datasetKeyProvider: key++
          }
        });

      this.setState({
        chartData: {
          labels: _labels,
          datasets: _datasets
        }
      });
    }
    else {
      this.setState({
        totalSales: 0,
        chartData: {
          labels: _labels,
          datasets: []
        }
      });
    }
  }

  render() {
    return (
      <div className='salesReport'>
        <div className='header'> <p >{this.state.date + " - Hourly Sales Breakdown"}</p></div>
        <div className='chart'><BarChart chartData={this.state.chartData} totalSales={this.state.totalSales} /></div>
        <div className='totalSales'><h1>Total: £{this.state.totalSales.toFixed(2)}</h1></div>
        <div className='date'>
          <input id='startDate' type="date" title='start' max={this.todaysDate()} onChange={event => this.dateChange(event)}></input>
        </div>
        <Table className='table' sales={this.state.tableData} />
      </div>
    );
  }

}

export default SalesByHour;