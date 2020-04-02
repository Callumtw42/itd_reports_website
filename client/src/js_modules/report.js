import React from 'react';
import styled from 'styled-components';
import * as f from './functions.js';
import EnhancedTable from './table.js';
import HeaderBar from './header_bar.js'


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
    })
}

function allocateData(data, setTotalSales, formatChartData, formatTableData) {
  formatChartData(data);
  formatTableData(data);
  // allocations.map(e=>{return e(data)});
  setTotalSales(
    f.sum(f.getColumn(data, 'Sales')) - f.sum(f.getColumn(data, 'Refund')),
  );
}

export function Report(props) {

  return (
    <Div>
<HeaderBar header = {props.header}></HeaderBar>
      <div className='report'>
        <div className='totalSales'><h1>Total: £{props.totalSales.toFixed(2)}</h1></div>
        {props.chart}
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

.report {
  max-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  background: var(--primary);
  text-align: center;
  box-shadow: var(--shadow);
  overflow-y: scroll;
}


.totalSales > h1{
  font-size: 3em;
  margin: 0;
}


.totalSales {
  margin: 30px 0 0 0;

}

.date {
  display: flex;
  flex-direction: row;
  margin: 0 auto;

}

.MuiInputBase-root{
  font-size: 3em;
}

.MuiFormControl-root{
  min-width: 300px;
}

.MuiFormLabel-root{
  font-size: 3em;
}

@media (min-width:64em){

.totalSales > h1{
  font-size: 2em;
  margin: 0;
}

.MuiInputBase-root{
  font-size: 1em;
}

.MuiFormLabel-root{
  font-size: 1em;
}

}

`;