import './style.scss';
import 'date-fns';
import useSelect from '../../../../../lib/useselect/useselect'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Paper, Container, Typography } from '@material-ui/core';
import { BarChart as BarChartIcon, PieChart as PieChartIcon } from '@material-ui/icons';
import React, { SetStateAction, useContext, useEffect, useState } from 'react';

import PieChart from '../../../../../lib/chart/piechart/piechart';
import StackedBarChart from '../../../../../lib/chart/stackedbarchart/bar_chart';
import * as d from '../../../../../lib/datafns';
import Table from '../../../../../lib/table/table';
import useData, { obj } from '../../../../../lib/usedata/usedata';
import useDate from '../../../../../lib/usedate/usedate';
import DropDown from '../../../../drop_down';
import HeaderBar from '../headerbar/headerbar';
import useIconSwitch from './icon_switch';
import RadioButtons from '../radio_buttons/radio_buttons.';
import { ReportProps } from '../logic';
import { formatTableData, GetChartProps } from './logic';
import Div from './style';

export function SalesBreakdown(props: ReportProps) {

  const {
    startDate,
    endDate,
    Dates,
  } = useDate();

  const { Select, selected } = useSelect(['Category', 'Product', 'PriceMark', 'Cashier', 'Receipt'], "black")

  const { data, Spinner } = useData(`/api/salesByProduct/${props.db}/${startDate}/${endDate}`)

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

  useEffect(() => {
    setGroupBy(selected)
  }, [selected])

  function Total() {
    return (
      <div className='sales'>
        <Select />
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

  return (
    <div className="salesBreakdown">
      <Spinner >
        <Paper className='reportContainer'>
          <HeaderBar  >
            <div className="left">
              <Typography className='text' variant="h6"> {props.header}</Typography>
              <Dates />
              {/* <div><input type="date"></input><CalendarTodayIcon /></div> */}
            </div>
            <div className="right">
              <IconSwitch />
            </div>
          </HeaderBar>
          <div className='reportBody'>
            <><Total /><GetChart chart={chart} /></>
            <Table data={tableData} />
          </div>
        </Paper>
      </Spinner >
    </div>
  );
}