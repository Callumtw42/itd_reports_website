import 'date-fns';
import React, { useEffect, useState } from 'react';
import BarChart from '../bar_chart.js';
import DateField from '../date_field.js';
import * as f from '../functions.js';
import { fetchData, Report} from './report.js';
import {todaysDate} from './report_interface.js';

export default function SalesByHour(props) {

  const [date, setDate] = useState(todaysDate());
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [totalSales, setTotalSales] = useState(0);
  const [header, setHeader] = useState({ row1: "Sales By Hour", row2: todaysDate() });

  useEffect(() => {
    getData(date);
    if (props.display === 'inline') props.callBack(header);
  }, [date, props.db]);

  useEffect(() => {
    if (props.display === 'inline') props.callBack(header);
  }, [props.display]);

  const getData = (date) => {
    fetchData(`/api/hourlySalesData/${props.db}/${date}`, allocateData);
  };

  function allocateData(data) {
    console.log(data);
    formatChartData(data);
    formatTableData(data);
    setTotalSales(
      f.sum(f.getColumn(data, 'Sales')) - f.sum(f.getColumn(data, 'Refund')),
    );
  }

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
              let salesAtTime = f.getElementsWithValue(f.getElementsWithValue(salesData, 'Category', o), 'TillHour', i).map(j => { return j.Sales - j.Refund });
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

  function dateChange(event) {
    let caller = event.target;
    let newDate = caller.value;
    if (caller.id === 'startDate') {
      setHeader({ row1: "Sales By Hour", row2: newDate })
      setDate(newDate);
    }
  };


  function Bar() {
    return <BarChart className='chart' chartData={chartData} totalSales={totalSales} ></BarChart>
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

    return <div className='totalSales'><h1>Total: £{totalSales.toFixed(2)}</h1></div>;

  }

  return (
    <Report
      header={header}
      tableData={tableData}
      content = {<><Total/><Bar/><Dates/></>}
    />
  )

}

