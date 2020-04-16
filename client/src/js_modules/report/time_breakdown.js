import 'date-fns';
import React, { useEffect, useState } from 'react';
import BarChart from '../bar_chart.js';
import DateField from '../date_field.js';
import * as f from '../functions.js';
import RadioButtons from '../radio_buttons.js';
import DropDown from '../drop_down.js';
import { useSalesBreakdown } from './sales_breakdown.js';
import EnhancedTable from '../table.js';
import HeaderBar from '../header_bar.js';
import Paper from '@material-ui/core/Paper';

export function useTimeBreakdown(props) {

  let {
    chartData,
    setChartData,
    sales,
    setSales,
    dataChoice,
    groupBy,
    data,
    tableData,
    header,
    setHeader,
    todaysDate,
    fetchData,
    allocateData,
    formatTableData,
    dateChange,
    switchData,
    Dates,
    Total,
    MyChart,

  } = useSalesBreakdown(props, {formatChartData});

  const [date, setDate] = useState(todaysDate());

  formatTableData = (_data) => {
    _data.forEach(e => { Object.assign(e, { Profit: e.Sales - e.Cost - e.Refund }) });
    return f.removeColumns(_data, 'Cat', 'TillHour');
  }

  function idToName() {
    return (groupBy === 'Id') ? 'Product' : 'Category';
  }

  function formatChartData(response, setX) {
    let _labels = Array.from(Array(24).keys()).map(obj => { return ('0' + obj + ':00').slice(-5) });
    if (response.length > 0) {
      let key = 0;
      let departments = f.getUniqueValues(response, idToName());
      let categories = f.getUniqueValues(response, groupBy);

      let _datasets =
        departments.map(o => {
          let colors = [];
          return {
            label: o,
            data: _labels.map(i => {
              colors.push([categories[departments.indexOf(o)]])
              let salesAtTime = f.getElementsWithValue(
                f.getElementsWithValue(response, idToName(), o), 'TillHour', i).map(x => setX(x)
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
      setSales(0);
    }
  }

  dateChange = function (event) {
    let caller = event.target;
    let newDate = caller.value;
    if (caller.id === 'startDate') {
      setDate(newDate);
    }
  };

  MyChart = function () {
    return <BarChart className='chart' chartData={chartData} totalSales={sales} ></BarChart>
  }

  Dates = function () {
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

  return {
    dataChoice,
    groupBy,
    data,
    tableData,
    header,
    setHeader,
    fetchData,
    allocateData,
    switchData,
    Dates,
    Total,
    MyChart,
    date,
  }
}

export function TimeBreakdown(props) {

  const {
    dataChoice,
    groupBy,
    data,
    tableData,
    header,
    setHeader,
    fetchData,
    allocateData,
    switchData,
    Dates,
    Total,
    MyChart,
    date,
  } = useTimeBreakdown(props);

  useEffect(() => {
    fetchData(`/api/salesByProduct/${props.db}/${date}/${date}`);
    setHeader({ row1: "Time Breakdown", row2: date });
  }, [date, props.db]);

  useEffect(() => {
    if (props.display === 'inline') props.callBack(header);
  }, [props.display, header]);

  useEffect(() => {
    switchData(dataChoice);
  }, [groupBy, dataChoice]);

  useEffect(() => {
    allocateData(data);
  }, [data]);

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
  )

}



