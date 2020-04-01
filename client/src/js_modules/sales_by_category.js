import 'date-fns';
import React, { useEffect, useState } from 'react';
import DateField from './date_field.js';
import * as f from './functions.js';
import PieChart from './pie_chart.js';
import { fetchData, Report, todaysDate } from './report.js';

export default function SalesByCategory(props) {

  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [totalSales, setTotalSales] = useState(0);
  const [startDate, setStartDate] = useState(todaysDate());
  const [endDate, setEndDate] = useState(todaysDate());
  const [header, setHeader] = useState({ row1: "Sales By Category", row2: todaysDate() + ' - ' + todaysDate() });

  function getData(start, end) {
    fetchData(`/api/salesData/${start}/${end}`, setTotalSales, formatChartData, formatTableData);
  }

  useEffect(() => {
    getData(startDate, endDate);
    if (props.display === 'inline') props.callBack(header);
  }, [startDate, endDate]);

  useEffect(() => {
    if (props.display === 'inline') props.callBack(header);
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
    <Report
      startDate={startDate}
      dateChange={dateChange}
      endDate={endDate}
      chartData={chartData}
      totalSales={totalSales}
      tableData={tableData}
      chart={pie()}
      date={dates()}
    >

    </Report>
  )
}
