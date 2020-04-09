import 'date-fns';
import React, { useEffect, useState } from 'react';
import DateField from '../date_field.js';
import * as f from '../functions.js';
import PieChart from '../pie_chart.js';
import { fetchData, Report } from './report.js';
import { todaysDate } from './report_interface.js';
import styled from 'styled-components';
import RadioButtons from '../radio_buttons.js';

export default function SalesByCategory(props) {

  const [resultData, setResultData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [totalSales, setTotalSales] = useState(0);
  const [profit, setProfit] = useState(0);
  const [total, setTotal] = useState(0);
  const [startDate, setStartDate] = useState(todaysDate());
  const [endDate, setEndDate] = useState(todaysDate());
  const [header, setHeader] = useState({ row1: "Sales By Category", row2: todaysDate() + ' - ' + todaysDate() });
  const [dataChoice, setDataChoice] = useState('Sales');
  const [quantity, setQuantity] = useState(0);

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
    setResultData(data);
    formatChartData(data, x => { return f.getValue(x, 'Sales').toFixed(2) });
    formatTableData(data);
    setTotalSales(
      f.sum(f.getColumn(data, 'Sales'))
    );
    setTotal(
      f.sum(f.getColumn(data, 'Sales'))
    );
    setProfit(f.sum(f.getColumn(data, 'Sales')) 
    - f.sum(f.getColumn(data, 'Refund')) 
    - f.sum(f.getColumn(data, 'Cost')));
    setQuantity(f.sum(f.getColumn(data, 'Qty')));
  }



  function formatTableData(data) {
    setTableData(f.removeColumns(data, 'Cat'))
  }

  function formatChartData(salesData, setX) {
    let _data = (salesData.length > 0) ? salesData.map(saleCat => setX(saleCat)) : [0];
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

    return <div className='totalSales'><RadioButtons handleChange={handleDataChoice} value={dataChoice} /><h1>Total: {(total === quantity) ? total : '£' + total.toFixed(2)}</h1></div>;

  }

  const handleDataChoice = (event) => {
    let choice = event.target.value

    switch (choice) {
      case 'Sales': formatChartData(resultData, x => { return x.Sales.toFixed(2) }); setTotal(totalSales);
        break;
      case 'Profit': formatChartData(resultData, x => { return (x.Sales - x.Cost - x.Refund).toFixed(2) }); setTotal(profit);
        break;
      case 'Quantity': formatChartData(resultData, x => { return (x.Qty) }); setTotal(quantity);
        break;
      default:
        break;
    }

    setDataChoice(choice);
  }

  return (
    <>
      <Report
        header={header}
        tableData={tableData}
        content={<Div><Total /><Pie /><Dates /></Div>}
      />
    </>
  )
}


const Div = styled.div`

.totalSales > h1{
  font-size: 32px;
  margin: auto 0;
  margin-right: 5%;
}

.totalSales {
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

  .totalSales > h1{
    font-size: 1em;
  }

  .totalSales {
    margin: 1em 0 0 0;
  }
}
`;