import 'date-fns';
import React, { useEffect, useState } from 'react';
import DateField from '../date_field.js';
import * as f from '../functions.js';
import PieChart from '../pie_chart.js';
import RadioButtons from '../radio_buttons.js';
import DropDown from '../drop_down.js';
import './Report.scss';
import EnhancedTable from '../table.js';
import HeaderBar from '../header_bar.js';
import Paper from '@material-ui/core/Paper';
import { restart } from 'nodemon';

function useData(url, format) {

  const [data, setData] = useState([]);

  const fetchData = (...then) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(format(data));
        then.map(f => { return f(data) })
      })
      .catch((error) => {
      })
  }

  function notEmpty(data) {
    return (data && data.length);
  }

  function getColumn(data, col) {
    return (notEmpty(data)) ? data.map(e => { return e[col] }) : [0];
  }

  function sumColumn(data, col) {
    return getColumn(data, col).reduce((acc, n) => { return acc + n });
  }

  function setColumn(data, column, f) {
    let copy = JSON.parse(JSON.stringify(data));
    copy.forEach(e => e[column] = f(e[column]));
    return copy;
  }

  function addColumn(data, column, newColumn, f) {
    let copy = JSON.parse(JSON.stringify(data));
    copy.forEach(e => Object.assign(e, { [newColumn]: f(e[column]) }));
    return copy;
  }

  function removeColumns(data, ...col) {
    const _data = JSON.parse(JSON.stringify(data));
    return (notEmpty(_data)) ? _data.map(e => { col.map(c => { return delete e[c] }); return e }) : [];
  }

  function sumAndGroup(data, col) {
    // const data = JSON.parse(JSON.stringify(data));
    let groups = getUniqueValues(data, col);
    let split = groups.map(e => { return getElementsWithValue(data, col, e) });
    const sumObjectsByKey = (obj1, obj2) => {
      Object.keys(obj1).forEach(k => { obj1[k] = (typeof obj1[k] === 'number' && k !== col) ? obj1[k] + obj2[k] : obj1[k] });
      return obj1;
    }
    split = JSON.parse(JSON.stringify(split));
    let grouped = split.map(a => { return a.reduce(sumObjectsByKey) });
    return grouped;
  }

  function getUniqueValues(data, col) {
    return [...new Set(data.map(i => {
      return i[col];
    }))];
  }

  function getElementsWithValue(data, key, value) {
    return data.filter(e =>
      e[key] === value)
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data,
    setData,
    fetchData,
    sumColumn,
    setColumn,
    removeColumns,
    sumAndGroup,
    getUniqueValues,
    getElementsWithValue,
    addColumn
  }

}


export function useReport(props, url, formatData, formatTableData) {

  const { data, ...rest
    // setData,
    // fetchData,
    // sumColumn,
    // setColumn,
    // removeColumns,
    // sumAndGroup,
    // getUniqueValues,
    // getElementsWithValue,
    // addColumn
  } = useData(url, formatData);

  const [tableData, setTableData] = useState([]);
  const [header, setHeader] = useState('');

  useEffect(() => {
    if (props.display === 'inline') props.setHeader(header);
  }, [props.display, header]);

  useEffect(() => {
    setTableData(formatTableData(data));
  }, [data])

  return {
    rest,
    data,

    tableData,
    setTableData,
    header,
    setHeader,


    // data,
    // setData,
    // fetchData,
    // sumColumn,
    // setColumn,
    // removeColumns,
    // sumAndGroup,
    // getUniqueValues,
    // getElementsWithValue,
    // addColumn,
    // tableData,
    // setTableData,
    // header,
    // setHeader
  }
}


export function useSalesBreakdown(props, override) {

  const [startDate, setStartDate] = useState(todaysDate());
  const [endDate, setEndDate] = useState(todaysDate());

  const {
    data,
    setData,
    fetchData,
    sumColumn,
    setColumn,
    removeColumns,
    sumAndGroup,
    getUniqueValues,
    getElementsWithValue,
    addColumn,
    tableData,
    setTableData,
    header,
    setHeader
  } = useReport(props, `/api/salesByProduct/${props.db}/${startDate}/${endDate}`, formatData, formatTableData);

  const [chartData, setChartData] = useState({});
  const [sales, setSales] = useState(0);
  const [profit, setProfit] = useState(0);
  const [total, setTotal] = useState(0);
  const [dataChoice, setDataChoice] = useState('Sales');
  const [quantity, setQuantity] = useState(0);
  const [groupBy, setGroupBy] = useState('Cat');


  function todaysDate() {
    var today = new Date();
    var date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2);
    return date;
  }

  function formatData(data) {
    return addColumn(data, 'AssocProdID', 'PriceMark', (cell) => { return cell ? 'Non PM' : 'PM' });
  }

  function formatTableData() {
    let format = sumAndGroup(data, groupBy);
    format.forEach(e => { Object.assign(e, { Profit: e.Sales - e.Cost - e.Refund }) });
    return removeColumns(format, 'TillTime', 'TillHour', 'TillDate', 'Cat', 'AssocProdID');
  }

  let idToName = (e) => {
    switch (groupBy) {
      case 'Id': return e['Product'];
      case 'Cat': return e['Category'];
      case 'AssocProdID': return e['PriceMark'];
      default: return e[groupBy];
    }
  }

  let formatChartData = override && override.formatChartData ? override.formatChartData : (data, setX) => {
    let _data = sumAndGroup(data, groupBy)
    let axisData = (_data.length > 0) ? _data.map(e => setX(e)) : [0];
    return {
      labels: _data.map(e => idToName(e)),
      datasets: [
        {
          label: 'Net Sales £',
          data: axisData,
          backgroundColor: f.colors(getUniqueValues(_data, groupBy))
        }
      ]
    };
  }

  let switchData = (data, dataChoice) => {
    switch (dataChoice) {
      case 'Sales': return {
        chartData: formatChartData(data, x => { return x.Sales }),
        tableData: formatTableData(data),
        total: sales
      }
      case 'Profit': return {
        chartData: formatChartData(data, x => { return (x.Sales - x.Cost || 0 - x.Refund || 0) }),
        tableData: formatTableData(data),
        total: profit
      }
      case 'Quantity': return {
        chartData: formatChartData(data, x => { return (x.Qty) }),
        tableData: formatTableData(data),
        total: quantity
      }
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

  function Dates() {
    return (
      <div className='date'>
        <DateField
          id="startDate"
          label="Start Date"
          defaultValue={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />
        <DateField
          id="endDate"
          label="End Date"
          defaultValue={endDate}
          onChange={(event) => setEndDate(event.target.value)}
        />
      </div>
    )
  }

  function Total() {

    return (
      <div className='sales'>
        <DropDown callback={handleGroupBySwitch} list={['Cat', 'Id', 'AssocProdID']} title={'Group By'} />
        <RadioButtons handleChange={handleDataChoiceSwitch} value={dataChoice} />
        <h1>Total: {(total === quantity) ? total : '£' + total.toFixed(2)}</h1>
      </div>);
  }

  function MyChart() {
    return <PieChart className='chart' chartData={chartData} totalSales={sales} ></PieChart>
  }


  useEffect(() => {

    let block = switchData(data, dataChoice);
    setTableData(block.tableData);
    setChartData(block.chartData);
    setTotal(block.total);
  }, [groupBy, dataChoice]);

  useEffect(() => {
    // let _data = addColumn(data, 'AssocProdID', 'PriceMark', (cell) => { return cell ? 'Non Price Mark' : 'Price Mark' });

    setChartData(formatChartData(data, x => { return x.Sales }));
    setSales(
      sumColumn(data, 'Sales')
    );
    setTotal(
      sumColumn(data, 'Sales')
    );
    setProfit(
      sumColumn(data, 'Sales')
      - sumColumn(data, 'Refund')
      - sumColumn(data, 'Cost')
    );
    setQuantity(sumColumn(data, 'Qty'));
  }, [data]);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    chartData,
    setChartData,
    sales,
    setSales,
    profit,
    setProfit,
    total,
    setTotal,
    dataChoice,
    setDataChoice,
    quantity,
    setQuantity,
    groupBy,
    setGroupBy,
    data,
    setData,
    tableData,
    setTableData,
    header,
    setHeader,
    todaysDate,
    fetchData,
    formatTableData,
    idToName,
    formatChartData,
    switchData,
    handleDataChoiceSwitch,
    handleGroupBySwitch,
    Dates,
    Total,
    MyChart,
    data,
    fetchData,
    sumColumn,
    setColumn,
    removeColumns,
    sumAndGroup,
    getUniqueValues,
    getElementsWithValue,
    setColumn,
    addColumn
  }


}

export function SalesBreakdown(props) {

  const {
    header,
    tableData,
    Dates,
    Total,
    MyChart,
  } = useSalesBreakdown(props);

  return (

    <div className='report'>
      <Paper className='reportContainer'>
        <HeaderBar header={header}></HeaderBar>
        <div className='reportBody'>
          <><Total /><MyChart /><Dates /></>
          <EnhancedTable data={tableData} />
        </div>
      </Paper>
    </div>

  );
}