import 'date-fns';
import React, { useEffect, useState } from 'react';
import DateField from '../date_field.js';
import * as f from '../functions.js';
import PieChart from '../pie_chart.js';
import RadioButtons from '../radio_buttons.js';
import DropDown from '../drop_down.js';
import { useReport } from './report.js';
import { Report } from './report.js';

export function useVariableTimeReport(props, formatChart, id2) {

  const {
    url,
    setUrl,
    todaysDate,
    data,
    fetchData
  } = useReport(props);

  const [startDate, setStartDate] = useState(todaysDate());
  const [endDate, setEndDate] = useState(todaysDate());
  const [chartData, setChartData] = useState({});
  const [sales, setSales] = useState(0);
  const [profit, setProfit] = useState(0);
  const [total, setTotal] = useState(0);
  const [dataChoice, setDataChoice] = useState('Sales');
  const [quantity, setQuantity] = useState(0);
  const [groupBy, setGroupBy] = useState('Cat');
  const [header, setHeader] = useState(props.header);

  useEffect(() => {
    getData(startDate, endDate, allocateData)
    if (props.display === 'inline') props.callBack(header);
  }, [startDate, endDate]);

  useEffect(() => {
    switchData(dataChoice, formatChartData);
  }, [groupBy, dataChoice]);

  function getData(start, end, allocate) {
    let _url = `/api/salesByProduct/${props.db}/${start}/${end}`
    setUrl(_url);
    fetchData(_url, allocate);
  }

  const allocateData = (response) => {
    formatChartData(response, x => { return x.Sales });
    setTotals(response);
  }

  function setTotals(response) {
    setSales(
      f.sum(f.getColumn(response, 'Sales'))
    );
    setTotal(
      f.sum(f.getColumn(response, 'Sales'))
    );
    setProfit(f.sum(f.getColumn(response, 'Sales'))
      - f.sum(f.getColumn(response, 'Refund'))
      - f.sum(f.getColumn(response, 'Cost')));
    setQuantity(f.sum(f.getColumn(response, 'Qty')));
  }

  function formatTableData(_data) {
    let format = f.sumAndGroup(_data, 'Id');
    format.forEach(e => { Object.assign(e, { Profit: e.Sales - e.Cost - e.Refund }) });
    return f.removeColumns(format, 'TillTime', 'TillHour', 'TillDate', 'Cat');
  }

  const idToName =(id2) ? id2 : (e) => {
    return (groupBy === 'Id') ? e['Product'] : e['Category'];
  }

  const formatChartData = (formatChart) ? formatChart : (response, setX) => {

    let _data = f.sumAndGroup(response, groupBy)
    let axisData = (_data.length > 0) ? _data.map(e => setX(e)) : [0];
    setChartData({

      labels: _data.map(e => idToName(e)),
      datasets: [
        {
          label: 'Net Sales £',
          data: axisData,
          backgroundColor: f.colors(f.getUniqueValues(_data, groupBy))
        }
      ]
    });
  }

  const dateChange = (event) => {
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

  function switchData(dataChoice, formatChartData) {
    switch (dataChoice) {
      case 'Sales': formatChartData(data, x => { return x.Sales }); setTotal(sales);
        break;
      case 'Profit': formatChartData(data, x => { return (x.Sales - x.Cost || 0 - x.Refund || 0) }); setTotal(profit);
        break;
      case 'Quantity': formatChartData(data, x => { return (x.Qty) }); setTotal(quantity);
        break;
      default:
        break;
    }
  }

  const handleDataChoiceSwitch = (event) => {
    let choice = event.target.value
    setDataChoice(choice);
    switchData(choice, formatChartData);
  }

  const handleGroupBySwitch = (value) => {
    setGroupBy(value);
  }

  return {
    url,
    header,
    allocateData,
    formatTableData,
    endDate,
    dateChange,
    handleGroupBySwitch,
    handleDataChoiceSwitch,
    dataChoice,
    total,
    quantity,
    chartData,
    sales,
    startDate,
    getData,
    switchData,
    setTotals,
    setChartData,
    setSales,
    setHeader,
    formatChartData,
  }
}

export default function VariableTimeReport(props) {

  const {
    url,
    header,
    formatTableData,
    endDate,
    dateChange,
    handleGroupBySwitch,
    handleDataChoiceSwitch,
    dataChoice,
    total,
    quantity,
    chartData,
    sales,
    startDate
  } = useVariableTimeReport(props);

  function Pie() {
    return <PieChart className='chart' chartData={chartData} totalSales={sales} ></PieChart>
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
        <DropDown callback={handleGroupBySwitch} list={['Cat', 'Id']} title={'Group By'} />
        <RadioButtons handleChange={handleDataChoiceSwitch} value={dataChoice} />
        <h1>Total: {(total === quantity) ? total : '£' + total.toFixed(2)}</h1>
      </div>);
  }

  return (
    <>
      <Report
        db={props.db}
        url={url}
        tableFormat={formatTableData}
        header={header}
        content={<><Total /><Pie /><Dates /></>}
        callBack={props.callBack}
        display={props.display}
      />
    </>
  )
}