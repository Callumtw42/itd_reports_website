import 'date-fns';
import React, { useEffect, useState } from 'react';
import BarChart from '../bar_chart.js';
import DateField from '../date_field.js';
import * as f from '../functions.js';
import { todaysDate } from './report_interface.js';
import styled from 'styled-components';
import RadioButtons from '../radio_buttons.js';
import DropDown from '../drop_down.js';

import { useSalesReport, SalesReport } from './sales_report.js';

export default function FixedTimeReport(props) {

  const parent = useSalesReport(props, toParent());

  const [date, setDate] = useState(todaysDate());
  useEffect(() => {

    parent.getData(date, date);
    if (props.display === 'inline') props.callBack(parent.header);
  }, [date, props.db]);

  useEffect(() => {
    let header = { row1: "Time Breakdown", row2: todaysDate() }
    parent.setHeader(header);
    if (props.display === 'inline') props.callBack(header);
  }, [])

  function toParent() {
    return {
      formatChartData: formatChartData,
    }
  }

  function idToName() {
    return (parent.groupBy === 'Id') ? 'Product' : 'Category';
  }

  function formatChartData(salesData, setX) {
    let _labels = Array.from(Array(24).keys()).map(obj => { return ('0' + obj + ':00').slice(-5) });
    if (salesData.length > 0) {
      let key = 0;
      let departments = f.getUniqueValues(salesData, idToName());
      let categories = f.getUniqueValues(salesData, parent.groupBy);

      let _datasets =
        departments.map(o => {
          let colors = [];
          return {
            label: o,
            data: _labels.map(i => {
              colors.push([categories[departments.indexOf(o)]])
              let salesAtTime = f.getElementsWithValue(
                f.getElementsWithValue(salesData, idToName(), o), 'TillHour', i).map(x => setX(x)
                );
              return f.sum(salesAtTime);
            }),
            backgroundColor: f.colors(colors),
            datasetKeyProvider: key++
          }
        });

      parent.setChartData({

        labels: _labels,
        datasets: _datasets

      });
      console.log(_datasets);
    }
    else {
      parent.setChartData({

        labels: _labels,
        datasets: []

      });
      parent.setSales(0);
    }
  }

  function dateChange(event) {
    let caller = event.target;
    let newDate = caller.value;
    if (caller.id === 'startDate') {
      parent.setHeader({ row1: "Sales By Hour", row2: newDate })
      setDate(newDate);
    }
  };

  function Bar() {
    return <BarChart className='chart' chartData={parent.chartData} totalSales={parent.sales} ></BarChart>
  }

  function Dates() {
    return (
      <div className='date'>
        <DateField
          id="startDate"
          label="Date"
          defaultValue={date}
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
    <SalesReport
      header={parent.header}
      tableData={parent.tableData}
      content={<><Total /><Bar /><Dates /></>}
    />
  )

}



