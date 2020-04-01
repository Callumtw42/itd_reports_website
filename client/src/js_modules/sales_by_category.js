import React, { useEffect, useState } from 'react';
import PieChart from './pie_chart.js';
import * as f from './functions.js';
import 'date-fns';
import DateField from './date_field.js';
import { todaysDate, fetchData, SalesReport } from './sales_report.js';

export default function SalesByCategory(props) {

  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [totalSales, setTotalSales] = useState(0);
  const [startDate, setStartDate] = useState(todaysDate());
  const [endDate, setEndDate] = useState(todaysDate());
  const [header, setHeader] = useState({ row1: "Sales By Category", row2: todaysDate() + ' - ' + todaysDate() });
  const [display, setDisplay] = useState(props.display);

  function getData(start, end) {
    fetchData(`/api/salesData/${start}/${end}`, setTotalSales, formatChartData, formatTableData);
  }

  useEffect(() => {
    getData(startDate, endDate);
    if (display === 'inline') props.callBack(header);
    console.log('Cat')
  }, [startDate, endDate, display]);

  useEffect(() => {
    setDisplay(props.display);
    if (display === 'inline') props.callBack(header);
    console.log("PROPS CHANGED");
  }, [props.display]);

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

  function formatTableData(data) {
    setTableData(f.removeColumns(data, 'Cat'))
  }

  function dateChange(event) {
    console.log(event.target.value);
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

  function pie() {
    return <PieChart className='chart' chartData={chartData} totalSales={totalSales} ></PieChart>
  }

  function dates() {
    return (
      <div className='date'>
        <DateField
          id="startDate"
          label="Start Date"
          defaultValue={startDate}
          onChange={(event) => dateChange(event)}
        />
        {console.log(todaysDate())}
        <DateField
          id="endDate"
          label="End Date"
          defaultValue={endDate}
          onChange={(event) => dateChange(event)}
        />
      </div>
    )
  }

  return (
    <SalesReport
      startDate={startDate}
      dateChange={dateChange}
      endDate={endDate}
      chartData={chartData}
      totalSales={totalSales}
      tableData={tableData}
      chart={pie()}
      date={dates()}
    >

    </SalesReport>
  )
}
