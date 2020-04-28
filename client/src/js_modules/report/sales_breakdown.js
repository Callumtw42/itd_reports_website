import { useStackedBarChart } from "../bar_chart";
import 'date-fns';
import React, { useEffect, useState } from 'react';
import useDate from "./date";
import DateField from '../date_field.js';
import * as f from '../functions.js';
import PieChart from '../pie_chart.js';
import BarChart from '../bar_chart.js';
import RadioButtons from '../radio_buttons.js';
import DropDown from '../drop_down.js';
import './Report.scss';
import EnhancedTable from '../table.js';
import HeaderBar from '../header_bar.js';
import Paper from '@material-ui/core/Paper';
import { usePieChart } from "../pie_chart"
import useDataFunctions from './data_functions'
import useReport from "./report";
import { Menu } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from '@material-ui/icons/PieChart';
import useIconSwitch from '../icon_switch';
import Typography from '@material-ui/core/Typography';


export function useSalesBreakdown(props, formatTableData) {

  const {
    sumColumn,
    addColumn,
  } = useDataFunctions();

  const {
    startDate,
    setEndDate,
    endDate,
    Dates,
    OneDate
  } = useDate();

  const {
    data,
    header,
    setHeader,
  } = useReport(props, `/api/salesByProduct/${props.db}/${startDate}/${endDate}`, formatData);

  const [groupBy, setGroupBy] = useState('Cat');
  const [total, setTotal] = useState(0);
  const [dataChoice, setDataChoice] = useState('Sales');
  const [tableData, setTableData] = useState([]);

  function formatData(data) {
    let priceMark = addColumn(data, 'AssocProdID', 'PriceMark', (cell) => { return cell ? 'PM' : 'Non PM' });
    priceMark.forEach(e => { Object.assign(e, { ['Profit']: (e['Sales'] - e['Discount'] - e['Cost']) }) });
    return priceMark;
  }

  function Total() {

    return (
      <div className='sales'>
        <DropDown callback={value => setGroupBy(value)} list={['Cat', 'Id', 'AssocProdID', 'CashierNum', 'Receipt']} names={['Category', 'Product', 'Price Mark', 'Cashier', 'Transaction']} title={'Group By'} />
        <RadioButtons handleChange={event => setDataChoice(event.target.value)} value={dataChoice} />
        <h1>Total: {(dataChoice === 'Qty') ? total : '£' + total.toFixed(2)}</h1>
      </div>);
  }

  useEffect(() => {
    setTableData(formatTableData());
    setTotal(sumColumn(data, dataChoice));
  }, [groupBy, dataChoice]);

  useEffect(() => {
    setTableData(formatTableData());
    setTotal(sumColumn(data, dataChoice));
  }, [data]);

  return {
    header,
    tableData,
    Dates,
    OneDate,
    Total,
    data,
    dataChoice,
    groupBy,
    total,
    setTableData,
    setEndDate,
    startDate
  }
}

export function SalesBreakdown(props) {


  const {
    header,
    tableData,
    setTableData,
    Dates,
    OneDate,
    Total,
    data,
    dataChoice,
    groupBy,
    total,
    setEndDate,
    startDate
  } = useSalesBreakdown(props, formatTableData);

  const {
    getColumn,
    sumAndGroup,
    removeColumns,
    addColumn,
    columns
  } = useDataFunctions();

  const grouped = sumAndGroup(data, groupBy);
  const { CustomPieChart } = usePieChart(
    getColumn(grouped, dataChoice),
    getColumn(grouped, idToName(groupBy)),
    getColumn(grouped, groupBy),
    total
  );

  const { StackedBarChart } = useStackedBarChart(
    Array.from(Array(24).keys()).map(obj => { return ('0' + obj + ':00').slice(-5) }),
    dataChoice,
    groupBy,
    data,
    total
  );

  const [chart, setChart] = useState('pie');

  const {
    IconSwitch
  } = useIconSwitch(
    [
      { icon: <BarChartIcon />, callBack: setChart.bind(this, 'bar') },
      { icon: <PieChartIcon />, callBack: setChart.bind(this, 'pie') }
    ]
  );

  function GetChart(props) {
    return props.chart === 'pie' ? <CustomPieChart />
      : <StackedBarChart />
  }

  function GetDateField(props) {
    return props.chart === 'pie' ? <Dates color = 'white' />
      : <OneDate color='white' />
  }

  function idToName(groupBy) {
    switch (groupBy) {
      case 'Id': return 'Product';
      case 'Cat': return 'Category';
      case 'AssocProdID': return 'PriceMark';
      case 'CashierNum': return 'Cashier';
      default: return groupBy;
    }
  }

  function formatTableData() {
    let format = sumAndGroup(data, groupBy, 'Id', 'CashierNum');
    switch (groupBy) {
      case 'AssocProdID': return columns(format, 'PriceMark', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
      case 'CashierNum': return columns(format, 'Cashier', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
      case 'Id': return columns(format, 'Product', 'Id', 'Category', 'PriceMark', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
      case 'Cat': return columns(format, 'Category', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
      case 'Receipt': return columns(format, 'Receipt', 'Cashier', 'TillTime', 'Sales', 'Cost', 'Discount', 'DsctReason', 'Refund', 'Profit', 'Qty');
      default: return columns(format, 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
    }
  }

  useEffect(() => {
    if (chart === 'bar')
      setEndDate(startDate);
  }, [chart])

  return (

    <div className='report'>
      <Paper className='reportContainer'>
        <HeaderBar  ><Typography className='text' variant="h6">{header}</Typography><GetDateField chart={chart} /><IconSwitch /></HeaderBar>
        <div className='reportBody'>
          <><Total /><GetChart chart={chart} /></>
          <EnhancedTable data={tableData} />
        </div>
      </Paper>
    </div>

  );
}