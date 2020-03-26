import React from 'react';
import PieChart from './pie_chart.js';
import Table from './table.js';
import SalesReport from './sales_report.js';
import '../css_modules/sales_report.scss';


class SalesByCategory extends SalesReport {
  constructor() {
    super();
    this.state.startDate = this.todaysDate();
    this.state.endDate = this.todaysDate();
  }

  getData(start, end) {
    super.getData(`/api/salesData/${start}/${end}`);
  }

  componentDidMount() {
    this.getData(this.todaysDate(), this.todaysDate());
  }

  formatChartData = (salesData) => {
    let _data = (salesData.length > 0) ? salesData.map(saleCat => saleCat.Sales) : [0];
    this.setState({
      chartData: {
        labels: salesData.map(saleCat => saleCat.Department),
        datasets: [
          {
            label: 'Net Sales £',
            data: _data,
            backgroundColor: this.colors(this.getUniqueValues(salesData, 'Cat'))
          }
        ]
      }
    });
  }

  formatTableData(data) {
    this.setState({ tableData: this.removeColumns(data, 'Cat') })
  }

  dateChange(event) {
    console.log(event.target.value);
    let caller = event.target;
    let newDate = caller.value;
    if (caller.id === 'startDate') {
      this.getData(newDate, this.state.endDate);
      this.setState({startDate:newDate});
    }
    else if (caller.id === 'endDate') {
      this.getData(this.state.startDate, newDate);
      this.setState({endDate:newDate});
    }
  };

  render() {
    return (
      <div className = 'box'>
        <p className = 'header'>{this.state.startDate + " - " + this.state.endDate + " Session Sales Report"}</p>
          <PieChart chartData={this.state.chartData} totalSales={this.state.totalSales} />
        <h1>Total: £{this.state.totalSales.toFixed(2)}</h1>
        <input id='startDate' type="date" title='start' max={this.todaysDate()} onChange={event => this.dateChange(event)}></input>
        <input id='endDate' type="date" title='end' max={this.todaysDate()} onChange={event => this.dateChange(event)}></input>
        <Table sales={this.state.tableData} />
      </div>
    );
  }
}

export default SalesByCategory;