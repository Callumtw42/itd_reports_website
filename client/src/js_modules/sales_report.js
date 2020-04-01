import * as f from './functions.js';
import React,{useState} from 'react';
import styled from 'styled-components';
import PieChart from './pie_chart.js';
import DateField from './date_field.js';
import EnhancedTable from './table.js';

  export function todaysDate() {
    var today = new Date();
    var date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2);
    return date;
  }

  export const fetchData = (url, ...allocations) => {
    fetch(url)
      .then(res => res.json())
      .then(data => allocateData(data, ...allocations))
      .catch((error) => {
        console.log(error)
      })
  }
//
  function allocateData(data, setTotalSales, formatChartData, formatTableData) {
    formatChartData(data);
    formatTableData(data);
    // allocations.map(e=>{return e(data)});
    setTotalSales(
      f.sum(f.getColumn(data, 'Sales')) - f.sum(f.getColumn(data, 'Refund')),
    );
  }

  export function SalesReport(props){

    return (
      <Div>
        <div className='salesReport'>
          {props.chart}
          <div className='totalSales'><h1>Total: £{props.totalSales.toFixed(2)}</h1></div>
          {props.date}
          <EnhancedTable data={props.tableData} />
        </div>
      </Div>
    );

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


.totalSales > h1{
  font-size: 48px;
  margin: 0;
}


.totalSales {
  margin: 0;
  font-size: 30px
}

.date > input{
  /* height: 100px; */
  width: 260px;
  font-size: 42px;
}

.chart {
  // grid-area: chart;
}

.date {
  display: flex;
  flex-direction: row;
  margin: 0 auto;

}

.table {
  // grid-area: table;
}

.totalSales {
  // grid-area: totalSales;
}

.MuiInputBase-root{
  font-size: 48px;
  min-width: 300px;
}

.MuiFormControl-root{
  min-width: 300px;
}

`;