import 'date-fns';
import React, { useEffect, useState } from 'react';
import BarChart from '../bar_chart.js';
import DateField from '../date_field.js';
import * as f from '../functions.js';
import RadioButtons from '../radio_buttons.js';
import DropDown from '../drop_down.js';
import { Report } from './report.js';

import { useReport } from './report.js';
import { useVariableTimeReport } from './variable_time_report.js';

export function useFixedTimeReport(props) {

  const {

    // setUrl,
    // fetchData,
    todaysDate,
    header,
    setHeader,
  } = useReport(props);

  const {
    chartData,
    sales,
    profit,
    total,
    dataChoice,
    quantity,
    groupBy,
    
    setTotals,
    setChartData,
    setSales,
   
    handleGroupBySwitch,
    handleDataChoiceSwitch,
    url,
    getData,
    allocateData
    // formatChartData
  } = useVariableTimeReport(props, formatChartData, idToName);

  const [date, setDate] = useState(todaysDate());

  useEffect(() => {
    getData(date, date, allocateData)
    // if (props.display === 'inline') props.callBack(header);
  }, [date]);

  // function getData(start, end, allocate) {
  //   let _url = `/api/salesByProduct/${props.db}/${start}/${end}`
  //   setUrl(_url);
  //   fetchData(_url, allocate);
  // }

  // function toParent() {
  //   return {
  //     formatChartData: formatChartData,
  //     formatTableData: formatTableData
  //   }
  // }

  // const allocateData = (response) => {
  //   formatChartData(response, x => { return x.Sales });
  //   setTotals(response);
  // }

  function formatTableData(_data) {
    _data.forEach(e => { Object.assign(e, { Profit: e.Sales - e.Cost - e.Refund }) });
    return f.removeColumns(_data, 'Cat', 'TillHour');
  }

  function idToName() {
    return (groupBy === 'Id') ? 'Product' : 'Category';
  }

  function formatChartData (salesData, setX) {
    let _labels = Array.from(Array(24).keys()).map(obj => { return ('0' + obj + ':00').slice(-5) });
    if (salesData.length > 0) {
      let key = 0;
      let departments = f.getUniqueValues(salesData, idToName());
      let categories = f.getUniqueValues(salesData, groupBy);

      let _datasets =
        departments.map(o => {
          let colors = [];
          return {
            label: o,
            data: _labels.map(i => {
              colors.push([categories[departments.indexOf(o)]])
              let salesAtTime = f.getElementsWithValue(
                f.getElementsWithValue(salesData, idToName(), o), 'TillHour', i).map(x => setX(x)
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
      console.log(_datasets);
    }
    else {
      setChartData({

        labels: _labels,
        datasets: []

      });
      setSales(0);
    }
  }

  function dateChange(event) {
    let caller = event.target;
    let newDate = caller.value;
    if (caller.id === 'startDate') {
      setHeader({ row1: "Time Breakdown", row2: newDate })
      setDate(newDate);
      // getData(newDate, newDate);
    }
  };

  return {
    chartData,
    sales,
    date,
    dateChange,
    handleGroupBySwitch,
    handleDataChoiceSwitch,
    dataChoice,
    total,
    quantity,
    total,
    url,
    formatTableData,
    header,
  }
}

export default function FixedTimeReport(props) {

  const {
    chartData,
    sales,
    date,
    dateChange,
    handleGroupBySwitch,
    handleDataChoiceSwitch,
    dataChoice,
    total,
    quantity,
    url,
    formatTableData,
    header,
  } = useFixedTimeReport(props);

  function Bar() {
    return <BarChart className='chart' chartData={chartData} totalSales={sales} ></BarChart>
  }

  function Dates() {
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

  function Total() {

    return (
      <div className='sales'>
        <DropDown callback={handleGroupBySwitch} list={['Cat', 'Id']} title={'Group By'} />
        <RadioButtons handleChange={handleDataChoiceSwitch} value={dataChoice} />
        <h1>Total: {(total === quantity) ? total : '£' + total.toFixed(2)}</h1>
      </div>);
  }

  return (
    <Report
      db={props.db}
      url={url}
      tableFormat={formatTableData}
      header={header}
      content={<><Total /><Bar /><Dates /></>}
      callBack={props.callBack}
      display={props.display}
    />
  )

}



