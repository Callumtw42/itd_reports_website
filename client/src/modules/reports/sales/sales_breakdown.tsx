import {
  GetDateFieldProps,
  GetChartProps,
  SalesBreakdownProps,
  formatTableData
} from "./logic";
import '../Report.scss';
import 'date-fns';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from '@material-ui/icons/PieChart';
import React, { useEffect, useState } from 'react';

import DropDown from '../../drop_down';
import HeaderBar from '../../header_bar';
import useIconSwitch from '../../icon_switch';
import PieChart from '../../lib/chart/piechart/piechart';
import StackedBarChart from '../../lib/chart/stackedbarchart/bar_chart';
import * as d from '../../lib/datafns';
import Table from '../../lib/table/table';
import useDate from '../../lib/usedate/usedate';
import RadioButtons from '../../radio_buttons';
import { obj } from '../../usedata';
// import useReport from '../report';
import useData from "../../usedata"
import { ReportProps } from "../logic";

export function SalesBreakdown(props: ReportProps) {

  const {
    startDate,
    endDate,
    Dates,
    Date
  } = useDate();

  // const {
  //   data,
  //   header,
  //   setHeader,
  // } = useReport(props, `/api/salesByProduct/${props.db}/${startDate}/${endDate}`, formatData);

  const { data } = useData(`/api/salesByProduct/${props.db}/${startDate}/${endDate}`)

  const [groupBy, setGroupBy] = useState<string>('Category');
  const [total, setTotal] = useState<number>(0);
  const [dataChoice, setDataChoice] = useState<string>('Sales');
  const [tableData, setTableData] = useState<obj[]>([]);
  const [chart, setChart] = useState('pie');

  const {
    IconSwitch
  } = useIconSwitch(
    [
      { icon: <BarChartIcon />, callBack: setChart.bind(this, 'bar') },
      { icon: <PieChartIcon />, callBack: setChart.bind(this, 'pie') }
    ]
  );

  useEffect(() => {
    setTableData(formatTableData(data, groupBy));
    setTotal(d.sumColumn(data, dataChoice));
  }, [groupBy, dataChoice, data]);

  function Total() {
    return (
      <div className='sales'>
        <DropDown
          callback={(value: string) => setGroupBy(value)}
          list={['Category', 'Product', 'PriceMark', 'Cashier', 'Receipt']}
          names={['Category', 'Product', 'Price Mark', 'Cashier', 'Receipt']}
          title={'Group By'} />
        <RadioButtons
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => setDataChoice(event.target.value)}
          value={dataChoice} />
        <h1>Total: {(dataChoice === 'Qty') ? total : '£' + total.toFixed(2)}</h1>
      </div>);
  }

  function GetChart(props: GetChartProps) {
    let barChartX = Array.from(Array(24).keys()).map(obj => { return ('0' + obj + ':00').slice(-5) })
    return props.chart === 'pie' ? <PieChart data={data} groupBy={groupBy} values={dataChoice} />
      : <StackedBarChart data={data} x={barChartX} groupBy={groupBy} values={dataChoice} />
  }

  function GetDateField(props: GetDateFieldProps) {
    return props.chart === 'pie' ? <Dates color='white' />
      : <Date color='white' />
  }

  return (
    <div className='report'>
      <Paper className='reportContainer'>
        <HeaderBar  >
          <Typography className='text' variant="h6"> {props.header}</Typography>
          <GetDateField chart={chart} />
          <IconSwitch />
        </HeaderBar>
        <div className='reportBody'>
          <><Total /><GetChart chart={chart} /></>
          <Table data={tableData} />
        </div>
      </Paper>
    </div>
  );
}