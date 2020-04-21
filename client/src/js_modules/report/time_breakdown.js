import 'date-fns';
import React, { useEffect, useState } from 'react';
import BarChart from '../bar_chart.js';
import DateField from '../date_field.js';
import * as f from '../functions.js';
import RadioButtons from '../radio_buttons.js';
import DropDown from '../drop_down.js';
import {
  useSalesBreakdown,
  useChart
} from './sales_breakdown.js';
import {useStackedBarChart} from "../bar_chart";
import EnhancedTable from '../table.js';
import HeaderBar from '../header_bar.js';
import Paper from '@material-ui/core/Paper';
import useDataFunctions from "./data_functions";

export function TimeBreakdown(props) {

  const {
    header,
    tableData,
    OneDate,
    Total,
    data,
    dataChoice,
    groupBy,
    total
  } = useSalesBreakdown(props, formatTableData);

  const {
    notEmpty,
    getColumn,
    sumColumn,
    setColumn,
    addColumn,
    removeColumns,
    sumAndGroup,
    getUniqueValues,
    getElementsWithValue
  } = useDataFunctions();

  const { StackedBarChart } = useStackedBarChart(
    Array.from(Array(24).keys()).map(obj => { return ('0' + obj + ':00').slice(-5) }),
    dataChoice,
    groupBy,
    data,
    total
  );

  function formatTableData() {
    return removeColumns(data, 'TillHour', 'TillDate', 'Cat', 'AssocProdID');
  }

  return (

    <div className='report'>
      <Paper className='reportContainer'>
        <HeaderBar header={header}></HeaderBar>
        <div className='reportBody'>
          <><Total /><StackedBarChart /><OneDate /></>
          <EnhancedTable data={tableData} />
        </div>
      </Paper>
    </div>

  );
}



