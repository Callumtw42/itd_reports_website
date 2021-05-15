import './style.scss';
import 'date-fns';

import { Paper, Typography } from '@material-ui/core';
import { BarChart as BarChartIcon, PieChart as PieChartIcon } from '@material-ui/icons';
import * as R from 'rambda';
import React, { SetStateAction, useContext, useEffect, useState } from 'react';

import PieChart from '../../../../../lib/chart/piechart/piechart';
import StackedBarChart from '../../../../../lib/chart/stackedbarchart/bar_chart';
import Table from '../../../../../lib/table/table';
import useSelect from '../../../../../lib/useselect/useselect';
import * as u from '../../../../../utils';
import HeaderBar from '../headerbar/headerbar';
import RadioButtons from '../radio_buttons/radio_buttons.';
import useIconSwitch from './icon_switch';
import { GetChartProps } from './logic';

export function SalesBreakdown({ dates, header, dateRange, db }) {
  const { start, end } = dates;
  const { Select, selected } = useSelect(['Category', 'Product', 'PriceMark', 'Cashier', 'Receipt'], "black")
  const [total, setTotal] = useState<number>(0);
  const [dataChoice, setDataChoice] = useState<string>('Sales');
  const [chart, setChart] = useState('pie');
  const {
    IconSwitch
  } = useIconSwitch(
    [
      { icon: <BarChartIcon />, callBack: setChart.bind(this, 'bar') },
      { icon: <PieChartIcon />, callBack: setChart.bind(this, 'pie') }
    ]
  );

  const [data, setData] = useState({
    tableData: [],
    barData: {},
    pieData: {},
    lineData: {}
  });

  useEffect(() => {
    u.get(`api/sales/itdepos/${start}/${end}/${selected}/${dataChoice}/${dateRange}`,
      (d) => {
        setData(d)
      })
  }, [selected, start, end, dataChoice])

  function GetChart(props: GetChartProps) {
    console.log(data.barData)
    return R.cond(
      [
        [() => props.chart === "pie", () => <PieChart data={data.pieData} />],
        [() => props.chart === "bar", () => <StackedBarChart data={data.barData} />]
      ]
    )()
  }

  return (
    <div className="salesBreakdown">
      {/* <Spinner > */}
      <Paper className='reportContainer'>
        <HeaderBar  >
          <div className="left">
            <Typography className='text' variant="h6"> {header}</Typography>
            {/* <Dates /> */}
            {/* <div><input type="date"></input><CalendarTodayIcon /></div> */}
          </div>
          <div className="right">
            <IconSwitch />
          </div>
        </HeaderBar>
        <div className='reportBody'>
          {/* <Total /> */}
          <div className='sales'>
            <Select />
            <RadioButtons
              handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setDataChoice(event.target.value)}
              value={dataChoice} />
            <h1>Total: {(dataChoice === 'Qty') ? total : '£' + total.toFixed(2)}</h1>
          </div>
          <GetChart chart={chart} />
          <Table data={data.tableData} />
        </div>
      </Paper>
      {/* </Spinner > */}
    </div>
  );
}