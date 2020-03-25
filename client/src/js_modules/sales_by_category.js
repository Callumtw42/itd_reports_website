import React from 'react';
import PieChart from './pie_chart.js';
import Table from './table.js';
import SalesReport from './sales_report.js';


class SalesByCategory extends SalesReport {

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

  dateChange(event) {
    console.log(event.target.value);
    let caller = event.target;
    let newDate = caller.value;
    if (caller.id === 'startDate') {
      this.getData(newDate, this.todaysDate());
    }
    else if (caller.id === 'endDate') {
     this.getData(this.todaysDate(), newDate);
    }
  };

  render() {
    return (
      <div>
        <h1>{this.state.date.startDate + " - " + this.state.date.endDate + " Session Sales Report"}</h1>
        <PieChart chartData={this.state.chartData} />
        <input id='startDate' type="date" title='start' max={this.todaysDate()} onChange={event => this.dateChange(event)}></input>
        <input id='endDate' type="date" title='end' max={this.todaysDate()} onChange={event => this.dateChange(event)}></input>
        <h1>Total: £{this.state.totalSales.toFixed(2)}</h1>
        <Table sales={this.state.tableData} />
      </div>
    );
  }
}

export default SalesByCategory;