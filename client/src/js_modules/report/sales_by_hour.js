import 'date-fns';
import React, { useEffect, useState } from 'react';
import BarChart from '../bar_chart.js';
import DateField from '../date_field.js';
import * as f from '../functions.js';
import { fetchData, Report } from './report.js';
import { todaysDate } from './report_interface.js';
import styled from 'styled-components';
import RadioButtons from '../radio_buttons.js';
import DropDown from '../drop_down.js';

export default function SalesByHour(props) {

  const [data, setdata] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [sales, setsales] = useState(0);
  const [profit, setProfit] = useState(0);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState(todaysDate());
  const [header, setHeader] = useState({ row1: "Sales By Hour", row2: todaysDate() });
  const [dataChoice, setDataChoice] = useState('Sales');
  const [quantity, setQuantity] = useState(0);
  const [groupBy, setGroupBy] = useState('Cat');

  useEffect(() => {
    getData(date);
    if (props.display === 'inline') props.callBack(header);
  }, [date, props.db]);

  useEffect(() => {
    if (props.display === 'inline') props.callBack(header);
  }, [props.display]);

  useEffect(() =>{
    switchData();
  },[groupBy, dataChoice]);

  const getData = (date) => {
    fetchData(`/api/hourlySalesData/${props.db}/${date}`, allocateData);
  };

  function allocateData(response) {
    console.log(response);
    setdata(response);
    formatChartData(response, x => { return x.Sales});
    formatTableData(response);
    setsales(
      f.sum(f.getColumn(response, 'Sales'))
    );
    setTotal(
      f.sum(f.getColumn(response, 'Sales'))
    );
    setProfit(f.sum(f.getColumn(response, 'Sales')) - f.sum(f.getColumn(response, 'Refund')) - f.sum(f.getColumn(response, 'Cost')));
    setQuantity(f.sum(f.getColumn(response, 'Qty')));
  }

  function formatTableData(_data) {
    setTableData(f.removeColumns(_data, 'Cat', 'TillDate', 'TillHour'));
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
      setsales(0);
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

  const handleDataChoiceSwitch = (event) => {
    let choice = event.target.value
    setDataChoice(choice);
  }

  const handleGroupBySwitch = (value) =>{
    setGroupBy(value);
  }

  function switchData(){
    switch (dataChoice) {
      case 'Sales': formatChartData(f.sumAndGroup(data, groupBy), x => { return x.Sales.toFixed(2) }); setTotal(sales);
        break;
      case 'Profit': formatChartData(f.sumAndGroup(data, groupBy), x => { return (x.Sales - x.Cost - x.Refund).toFixed(2) }); setTotal(profit);
        break;
      case 'Quantity': formatChartData(f.sumAndGroup(data, groupBy), x => { return (x.Qty) }); setTotal(quantity);
        break;
      default:
        break;
    }
  }


  function Bar() {
    return <BarChart className='chart' chartData={chartData} totalSales={sales} ></BarChart>
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
        <DropDown callback={handleGroupBySwitch} list={['Cat', 'Id']} title = {'Group By'} />
        <RadioButtons handleChange={handleDataChoiceSwitch} value={dataChoice} />
        <h1>Total: {(total === quantity) ? total : '£' + total.toFixed(2)}</h1>
      </div>);

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

