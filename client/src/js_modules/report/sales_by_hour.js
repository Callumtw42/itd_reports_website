import 'date-fns';
import React, { useEffect, useState } from 'react';
import BarChart from '../bar_chart.js';
import DateField from '../date_field.js';
import * as f from '../functions.js';
import { fetchData, Report } from './report.js';
import { todaysDate } from './report_interface.js';
import styled from 'styled-components';
import RadioButtons from '../radio_buttons.js';

export default function SalesByHour(props) {

  const [resultData, setResultData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [totalSales, setTotalSales] = useState(0);
  const [profit, setProfit] = useState(0);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState(todaysDate());
  const [header, setHeader] = useState({ row1: "Sales By Hour", row2: todaysDate() });
  const [dataChoice, setDataChoice] = useState('Sales');
  const [quantity, setQuantity] = useState(0);

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
    setResultData(data);
    formatChartData(data, x => { return x.Sales - x.Refund -x.Cost });
    formatTableData(data);
    setTotalSales(
      f.sum(f.getColumn(data, 'Sales'))
    );
    setTotal(
      f.sum(f.getColumn(data, 'Sales'))
    );
    setProfit(f.sum(f.getColumn(data, 'Sales')) - f.sum(f.getColumn(data, 'Refund')) - f.sum(f.getColumn(data, 'Cost')));
    setQuantity(f.sum(f.getColumn(data, 'Qty')));
  }

  function formatTableData(data) {
    setTableData(f.removeColumns(data, 'Cat', 'TillDate', 'TillHour'));
  }

  function formatChartData(salesData, setX) {
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
              let salesAtTime = f.getElementsWithValue(
                f.getElementsWithValue(salesData, 'Category', o), 'TillHour', i).map(x => setX(x)
                );
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

    return <div className='totalSales'><RadioButtons handleChange={handleDataChoice} value={dataChoice} /><h1>Total: {(total === quantity) ? total : '£' + total.toFixed(2)}</h1></div>;

  }

  const handleDataChoice = (event) => {
    let choice = event.target.value

    switch (choice) {
      case 'Sales': formatChartData(resultData, x => { return x.Sales }); setTotal(totalSales);
        break;
      case 'Profit': formatChartData(resultData, x => { return x.Sales - x.Cost -x.Refund }); setTotal(profit);
        break;
      case 'Quantity': formatChartData(resultData, x => { return x.Qty }); setTotal(quantity);
        break;
      default:
        break;
    }

    setDataChoice(choice);
  }

  return (
    <Report
      header={header}
      tableData={tableData}
      content={<Div><Total /><Bar /><Dates /></Div>}
    />
  )

}

const Div = styled.div`

.totalSales > h1{
  font-size: 32px;
  margin: auto 5%;
}

.totalSales {
  margin: 7em 0 0 0;
  display: flex;
  flex-direction: row;
}

@media (min-width:64em){

  .totalSales > h1{
    font-size: 1em;
  }

  .totalSales {
    margin: 1em 0 0 0;
  }
}
`;

