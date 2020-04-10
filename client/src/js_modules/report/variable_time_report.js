import 'date-fns';
import React, { useEffect, useState } from 'react';
import DateField from '../date_field.js';
import * as f from '../functions.js';
import PieChart from '../pie_chart.js';
import { todaysDate } from './report_interface.js';
import RadioButtons from '../radio_buttons.js';
import DropDown from '../drop_down.js';
import { useSalesReport, SalesReport } from './sales_report.js';

export default function VariableTimeReport(props) {

  const parent = useSalesReport(props, toParent());
  const [startDate, setStartDate] = useState(todaysDate());
  const [endDate, setEndDate] = useState(todaysDate());

  useEffect(() => {
    parent.getData(startDate, endDate);
    if (props.display === 'inline') props.callBack(parent.header);
  }, [startDate, endDate, props.db]);

  useEffect(() => {
    let header = { row1: "Sales Breakdown", row2: todaysDate() + ' - ' + todaysDate() };
    parent.setHeader(header);
    if (props.display === 'inline') props.callBack(header);
  }, [])

  function toParent() {
    return {
      formatChartData: formatChartData,
    }
  }

  function idToName(e) {
    return (parent.groupBy === 'Id') ? e['Product'] : e['Category'];
  }

  function formatChartData(response, setX) {
    let _data = f.sumAndGroup(response, parent.groupBy)
    let axisData = (_data.length > 0) ? _data.map(e => setX(e)) : [0];
    parent.setChartData({

      labels: _data.map(e => idToName(e)),
      datasets: [
        {
          label: 'Net Sales £',
          data: axisData,
          backgroundColor: f.colors(f.getUniqueValues(_data, parent.groupBy))
        }
      ]
    });
  }

  const dateChange = (event) => {
    let caller = event.target;
    let newDate = caller.value;
    if (caller.id === 'startDate') {
      parent.setHeader({ row1: "Sales By Category", row2: newDate + ' - ' + endDate })
      setStartDate(newDate);
    }
    else if (caller.id === 'endDate') {
      parent.setHeader({ row1: "Sales By Category", row2: startDate + ' - ' + newDate })
      setEndDate(newDate);
    }
  };

  function Pie() {
    return <PieChart className='chart' chartData={parent.chartData} totalSales={parent.sales} ></PieChart>
  }

  function Dates() {
    return (
      <div className='date'>
        <DateField
          id="startDate"
          label="Start Date"
          defaultValue={startDate}
          onChange={(event) => dateChange(event)}
        />
        <DateField
          id="endDate"
          label="End Date"
          defaultValue={endDate}
          onChange={(event) => dateChange(event)}
        />
      </div>
    )
  }

  function Total() {

    return (
      <div className='sales'>
        <DropDown callback={parent.handleGroupBySwitch} list={['Cat', 'Id']} title={'Group By'} />
        <RadioButtons handleChange={parent.handleDataChoiceSwitch} value={parent.dataChoice} />
        <h1>Total: {(parent.total === parent.quantity) ? parent.total : '£' + parent.total.toFixed(2)}</h1>
      </div>);

  }

  return (
    <>
      <SalesReport
        header={parent.header}
        tableData={parent.tableData}
        content={<><Total /><Pie /><Dates /></>}
      />
    </>
  )
}