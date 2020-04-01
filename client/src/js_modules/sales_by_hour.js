import React, { useEffect, useState } from 'react';
import BarChart from './bar_chart.js';
import * as f from './functions.js';
import 'date-fns';
import DateField from './date_field.js';
import { todaysDate, fetchData, SalesReport } from './sales_report.js';

function SalesByHour(props) {

  const [date, setDate] = useState(todaysDate());
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [totalSales, setTotalSales] = useState(0);
  const [header, setHeader] = useState({ row1: "Sales By Hour", row2: todaysDate() });
  const [display, setDisplay] = useState(props.display);

  useEffect(() => {
    getData(date);
    if (display === 'inline') props.callBack(header);
    console.log('Hour')
  }, [date, display]);

  useEffect(() => {
    setDisplay(props.display);
    if (display === 'inline') props.callBack(header);
    console.log("PROPS CHANGED");
  }, [props.display]);

  function getData(date) {
    fetchData(`/api/hourlySalesData/${date}`, setTotalSales, formatChartData, formatTableData);
  }


  function dateChange(event) {
    console.log(event.target.value);
    let caller = event.target;
    let newDate = caller.value;
    if (caller.id === 'startDate') {
      setHeader({ row1: "Sales By Hour", row2: newDate })
      setDate(newDate);
    }
  };

  function formatTableData(data) {

    setTableData(f.removeColumns(data, 'Cat', 'TillDate', 'TillHour'));
  }

  function formatChartData(salesData) {
    let _labels = Array.from(Array(24).keys()).map(obj => { return ('0' + obj + ':00').slice(-5) });
    if (salesData.length > 0) {
      let key = 0;
      let departments = f.getUniqueValues(salesData, 'Category');
      let categories = f.getUniqueValues(salesData, 'Cat');

      let _datasets =
        departments.map(o => {
          let colors = [];
          return {
            label: o,
            data: _labels.map(i => {
              colors.push([categories[departments.indexOf(o)]])
              let salesAtTime = f.getElementsWithValue(f.getElementsWithValue(salesData, 'Category', o), 'TillHour', i).map(j => { return j.Sales });
              return f.sum(salesAtTime);
            }),
            backgroundColor: f.colors(colors),
            datasetKeyProvider: key++
          }
        });

      setChartData({

        labels: _labels,
        datasets: _datasets

      });
    }
    else {
      setChartData({

        labels: _labels,
        datasets: []

      });
      setTotalSales(0);
    }
  }

  function bar() {
    return <BarChart className='chart' chartData={chartData} totalSales={totalSales} ></BarChart>
  }

  function dates() {
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

  return (
    <SalesReport
      dateChange={dateChange}
      chartData={chartData}
      totalSales={totalSales}
      tableData={tableData}
      chart={bar()}
      date={dates()}
    >

    </SalesReport>
  )

}

export default SalesByHour;