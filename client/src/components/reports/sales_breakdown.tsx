import { useStackedBarChart } from "../bar_chart";
import 'date-fns';
import React, { useEffect, useState } from 'react';
import useDate from "../usedate/usedate";
import DateField from '../usedate/date_field';
import * as f from '../functions';
import BarChart from '../bar_chart';
import RadioButtons from '../radio_buttons';
import DropDown from '../drop_down'
import './Report.scss';
import Table from '../table/table';
import HeaderBar from '../header_bar';
import Paper from '@material-ui/core/Paper';
import PieChart from "../piechart/piechart"
import * as d from './datafns'
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
import { obj } from "../usedata";

interface SalesBreakdownProps {
  header: string
  db: string
  display: React.Dispatch<any>
  phoneDisplay: string
}

export function useSalesBreakdown(props: SalesBreakdownProps, formatTableData: (data: d.obj[], groupBy: string) => d.obj[]) {


  const {
    startDate,
    endDate,
    Dates,
    Date
  } = useDate();

  const {
    data,
    header,
    setHeader,
  } = useReport(props, `/api/salesByProduct/${props.db}/${startDate}/${endDate}`, formatData);

  const [groupBy, setGroupBy] = useState<string>('Category');
  const [total, setTotal] = useState<number>(0);
  const [dataChoice, setDataChoice] = useState<string>('Sales');
  const [tableData, setTableData] = useState<d.obj[]>([]);


  function formatData(data: d.obj[]) {
    let priceMark = d.addColumn(data, 'AssocProdID', 'PriceMark', (cell) => { return cell ? 'PM' : 'Non PM' });
    priceMark.forEach(e => { Object.assign(e, { ['Profit']: (e['Sales'] - e['Discount'] - e['Cost']) }) });
    return priceMark;
  }

  function Total() {

    return (
      <div className='sales'>
        <DropDown callback={(value: string) => setGroupBy(value)} list={['Cat', 'Id', 'AssocProdID', 'CashierNum', 'Receipt']} names={['Category', 'Product', 'Price Mark', 'Cashier', 'Transaction']} title={'Group By'} />
        <RadioButtons handleChange={(event: React.ChangeEvent<HTMLInputElement>) => setDataChoice(event.target.value)} value={dataChoice} />
        <h1>Total: {(dataChoice === 'Qty') ? total : '£' + total.toFixed(2)}</h1>
      </div>);
  }

  useEffect(() => {
    setTableData(formatTableData(data, groupBy));
    setTotal(d.sumColumn(data, dataChoice));
  }, [groupBy, dataChoice]);

  useEffect(() => {
    setTableData(formatTableData(data, groupBy));
    setTotal(d.sumColumn(data, dataChoice));
  }, [data]);

  return {
    header,
    tableData,
    Dates,
    Date,
    Total,
    data,
    dataChoice,
    groupBy,
    total,
    setTableData,
    // setEndDate,
    startDate
  }
}

export function SalesBreakdown(props: SalesBreakdownProps) {


  const {
    header,
    tableData,
    setTableData,
    Dates,
    Date,
    Total,
    data,
    dataChoice,
    groupBy,
    total,
    // setEndDate,
    startDate
  } = useSalesBreakdown(props, formatTableData);


  const grouped = d.sumAndGroup(data, groupBy);

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

  interface GetChartProps {
    chart: string
  }
  function GetChart(props: GetChartProps) {
    return props.chart === 'pie' ? <PieChart data={data} groupBy={groupBy} values={dataChoice} />
      : <StackedBarChart />
  }

  interface GetDateFieldProps {
    chart: string
  }
  function GetDateField(props: GetDateFieldProps) {
    return props.chart === 'pie' ? <Dates color='white' />
      : <Date color='white' />
  }

  function idToName(groupBy: string) {
    switch (groupBy) {
      case 'Id': return 'Product';
      case 'Cat': return 'Category';
      case 'AssocProdID': return 'PriceMark';
      case 'CashierNum': return 'Cashier';
      default: return groupBy;
    }
  }

  function formatTableData(data: d.obj[], groupBy: string): d.obj[] {
    let format = d.sumAndGroup(data, groupBy, 'Id', 'CashierNum');
    switch (groupBy) {
      case 'AssocProdID': return d.columns(format, 'PriceMark', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
      case 'CashierNum': return d.columns(format, 'Cashier', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
      case 'Id': return d.columns(format, 'Product', 'Id', 'Category', 'PriceMark', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
      case 'Cat': return d.columns(format, 'Category', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
      case 'Receipt': return d.columns(format, 'Receipt', 'Cashier', 'TillTime', 'Sales', 'Cost', 'Discount', 'DsctReason', 'Refund', 'Profit', 'Qty');
      default: return d.columns(format, 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
    }
  }

  // useEffect(() => {
  //   if (chart === 'bar')
  //     // setEndDate(startDate);
  // }, [chart])

  return (

    <div className='report'>
      <Paper className='reportContainer'>
        <HeaderBar  ><Typography className='text' variant="h6">{header}</Typography><GetDateField chart={chart} /><IconSwitch /></HeaderBar>
        <div className='reportBody'>
          <><Total /><GetChart chart={chart} /></>
          <Table data={tableData} />
        </div>
      </Paper>
    </div>

  );
}