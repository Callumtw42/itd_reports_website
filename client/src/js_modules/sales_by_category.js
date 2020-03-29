import React from 'react';
import PieChart from './pie_chart.js';
import EnhancedTable from './table.js';
import SalesReport from './sales_report.js';
import styled from "styled-components/macro";

export default class SalesByCategory extends SalesReport {
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
      this.setState({ startDate: newDate });
    }
    else if (caller.id === 'endDate') {
      this.getData(this.state.startDate, newDate);
      this.setState({ endDate: newDate });
    }
  };

  render() {
    return (
      <Div>
        <div className='salesReport'>
          <div className='header'><p>{this.state.startDate + " - " + this.state.endDate + " Session Sales Report"}</p></div>
          <PieChart className='chart' chartData={this.state.chartData} totalSales={this.state.totalSales} />
          <div className='totalSales'><h1>Total: £{this.state.totalSales.toFixed(2)}</h1></div>
          <div className='date'>
            <input id='startDate' type="date" title='start' max={this.todaysDate()} onChange={event => this.dateChange(event)} defaultValue={this.state.startDate}></input>
            <input id='endDate' type="date" title='end' max={this.todaysDate()} onChange={event => this.dateChange(event)} defaultValue={this.state.startDate}></input>
          </div>
          <EnhancedTable data={this.state.tableData} />
        </div>
      </Div>
    );
  }

}

const Div = styled.div`
.header {
  /* display:inline-block; */
  font-size: 42px;
  background-color: rgba(0, 64, 101, 0.6);
  color: white;
  text-align: left;
  padding: 10px;
  box-shadow: 0 1px 1px rgba(104, 104, 104, 0.8);
  /* font-size: 48px; */
}

.header >p{
  margin: auto;
}

.salesReport {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: var(--primary);
  text-align: center;
  box-shadow: var(--shadow);
}

.totalSales {
  font-size: 30px
}

.date > input{
  height: 100px;
  width: 260px;
  font-size: 42px;
}

.chart {
  // grid-area: chart;
}

.date {
  // grid-area: dates;
}

.table {
  // grid-area: table;
}

.totalSales {
  // grid-area: totalSales;
}

`;

