import 'date-fns';
import React, { useEffect, useState } from 'react';
import DateField from '../date_field.js';
import * as f from '../functions.js';
import PieChart from '../pie_chart.js';
import { fetchData, Report } from './report.js';
import { todaysDate } from './report_interface.js';
import styled from 'styled-components';
import RadioButtons from '../radio_buttons.js';
import DropDown from '../drop_down.js';
import {useSalesReport, SalesReport} from './sales_report.js';

export default function VariableTimeReport(props) {
  const parent = useSalesReport(props);

  function Pie() {
    return <PieChart className='chart' chartData={parent.state.chartData} totalSales={parent.state.sales} ></PieChart>
  }

  function Dates() {
    return (
      <div className='date'>
        <DateField
          id="startDate"
          label="Start Date"
          defaultValue={parent.state.startDate}
          onChange={(event) => parent.functions.dateChange(event)}
        />
        <DateField
          id="endDate"
          label="End Date"
          defaultValue={parent.state.endDate}
          onChange={(event) => parent.functions.dateChange(event)}
        />
      </div>
    )
  }

  function Total() {

    return (
      <div className='sales'>
        <DropDown callback={parent.functions.handleGroupBySwitch} list={['Cat', 'Id']} title = {'Group By'} />
        <RadioButtons handleChange={parent.functions.handleDataChoiceSwitch} value={parent.state.dataChoice} />
        <h1>Total: {(parent.state.total === parent.state.quantity) ? parent.state.total : '£' + parent.state.total.toFixed(2)}</h1>
      </div>);

  }

  return (
    <>
      <SalesReport
        header={parent.state.header}
        tableData={parent.state.tableData}
        content={<Div><Total /><Pie /><Dates /></Div>}
      />
    </>
  )
}


const Div = styled.div`

.sales > h1{
  font-size: 32px;
  margin: auto 0;
  margin-right: 5%;
}

.sales {
  margin: 7em 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.date {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;

}

@media (min-width:64em){

  .sales > h1{
    font-size: 1em;
  }

  .sales {
    margin: 1em 0 0 0;
  }
}
`;