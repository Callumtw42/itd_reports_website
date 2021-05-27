import './style.scss';
import 'date-fns';

import { Paper, Typography } from '@material-ui/core';
import { BarChart as BarChartIcon, PieChart as PieChartIcon, Timeline as LineChartIcon } from '@material-ui/icons';
// import * as R from 'ramda';
import React, { SetStateAction, useContext, useEffect, useState } from 'react';
// import PieChart from '../../../../../lib/chart/piechart/piechart';
// import StackedBarChart from '../../../../../lib/chart/stackedbarchart/bar_chart';
// import LineChart from '../../../../../lib/chart/LineChart'
// import PieChart from '@callumtw42/toolkit/react/chart/piechart/piechart';
import PieChart from '../../../../../lib/chart/piechart/piechart';
import StackedBarChart from '../../../../../lib/chart/stackedbarchart/bar_chart';
import LineChart from '../../../../../lib/chart/LineChart'
import Table from '../../../../../lib/table/table';
import useSelect from '../../../../../lib/useselect/useselect';
import * as u from '@callumtw42/utils/utils';
import HeaderBar from '../headerbar/headerbar';
import RadioButtons from '../radio_buttons/radio_buttons.';
import useIconSwitch from './icon_switch';
import { GetChartProps } from './logic';

function GetChart({ chart, data }) {
  console.log("BAR")
  switch (chart) {
    case "pie": return <PieChart data={data.pieData} />
    case "bar": return <StackedBarChart data={data.barData} />
    case "line": return <LineChart data={data.lineData} />
  }
  // return R.cond(
  //   [
  //     [() => chart === "pie", () => <PieChart data={data.pieData} />],
  //     [() => chart === "bar", () => <StackedBarChart data={data.barData} />],
  //     [() => chart === "line", () => <LineChart data={data.lineData} />]
  //   ]
  // )()
}

export function SalesBreakdown({ dates, header, dateRange, db }) {
  const { start, end } = dates;
  const { Select, selected } = useSelect(['Category', 'Product', 'PriceMark', 'Cashier', 'Receipt'], "black")
  const [dataChoice, setDataChoice] = useState<string>('Sales');
  const {
    IconSwitch,
    iconValue
  } = useIconSwitch(
    [
      { icon: <BarChartIcon />, value: "bar" },
      { icon: <PieChartIcon />, value: "pie" },
      { icon: <LineChartIcon />, value: "line" }
    ]
  );

  const [data, setData] = useState({
    tableData: [],
    barData: {},
    pieData: {},
    lineData: {},
    total: 0
  });

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const url = `api/sales/itdepos/${start}/${end}/${selected}/${dataChoice}/${dateRange}`
    console.log(url);
    u.get(url,
      (d) => {
        setData(d);
        setTableData(d.tableData)
      })
  }, [selected, start, end, dataChoice])

  function handleSearch(e) {
    u.get(`api/salesSearch/itdepos/${start}/${end}/${selected}/${dataChoice}/${dateRange}/${e.currentTarget.value.trim() || ".*"}`,
      (d) => {
        setTableData(d)
      })
  }

  return (
    <div className="salesBreakdown">
      {/* <Spinner > */}
      <Paper className='reportContainer'>
        <HeaderBar  >
          <div className="left">

            <Typography variant="h6"> {header}</Typography>
            <input type="text" className="form-control" placeholder="search" onInput={(e) => handleSearch(e)}></input>
            {/* <Dates /> */}
            {/* <div><input type="date"></input><CalendarTodayIcon /></div> */}
          </div>
          <div className="right">
            <div className="icon">
              <IconSwitch />
            </div>
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
            <h1>Total: {data.total}</h1>
          </div>
          <GetChart data={data} chart={iconValue} />
          {/* <StackedBarChart data={data.barData}></StackedBarChart> */}
          <Table data={tableData} />
        </div>
      </Paper>
      {/* </Spinner > */}
    </div>
  );
}