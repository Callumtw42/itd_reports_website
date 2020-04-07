import 'date-fns';
import React, { useEffect, useState } from 'react';
import DateField from '../date_field.js';
import * as f from '../functions.js';
import PieChart from '../pie_chart.js';
import { fetchData, Report} from './report.js';
import {todaysDate} from './report_interface.js';

export default function NewReport(props) {

  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [totalSales, setTotalSales] = useState(0);
  const [startDate, setStartDate] = useState(todaysDate());
  const [endDate, setEndDate] = useState(todaysDate());
  const [header, setHeader] = useState({ row1: "New Report", row2: todaysDate() + ' - ' + todaysDate() });

  useEffect(() => {
    getData(startDate, endDate);
    if (props.display === 'inline') props.callBack(header);
  }, [startDate, endDate, props.db]);

  useEffect(() => {
    if (props.display === 'inline') props.callBack(header);
  }, [props.display]);

  function getData(start, end) {
    fetchData(`/api/salesData/${props.db}/${start}/${end}`, allocateData);
  }

  function allocateData(data) {
    console.log(data);
    formatChartData(data);
    formatTableData(data);
    setTotalSales(
      f.sum(f.getColumn(data, 'Sales')) - f.sum(f.getColumn(data, 'Refund')),
    );
  }

  function formatTableData(data) {
    setTableData(f.removeColumns(data, 'Cat'))
  }

  function formatChartData(salesData) {
    let _data = (salesData.length > 0) ? salesData.map(saleCat => saleCat.Sales) : [0];
    setChartData({

      labels: salesData.map(saleCat => saleCat.Category),
      datasets: [
        {
          label: 'Net Sales £',
          data: _data,
          backgroundColor: f.colors(f.getUniqueValues(salesData, 'Cat'))
        }
      ]

    });
  }

  function dateChange(event) {
    let caller = event.target;
    let newDate = caller.value;
    if (caller.id === 'startDate') {
      setHeader({ row1: "Sales By Category", row2: newDate + ' - ' + endDate })
      setStartDate(newDate);
    }
    else if (caller.id === 'endDate') {
      setHeader({ row1: "Sales By Category", row2: startDate + ' - ' + newDate })
      setEndDate(newDate);
    }
  };

  function Pie() {
    return <PieChart className='chart' chartData={chartData} totalSales={totalSales} ></PieChart>
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

    return <div className='totalSales'><h1>Total: £{totalSales.toFixed(2)}</h1></div>;

  }

  return (

    <Report
      header={header}
      tableData={tableData}
      content={<><Total/><Pie /><Dates /></>}
    />
  )
}
