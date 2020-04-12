import 'date-fns';
import React, { useEffect, useState } from 'react';
import DateField from '../date_field.js';
import * as f from '../functions.js';
import PieChart from '../pie_chart.js';
import RadioButtons from '../radio_buttons.js';
import DropDown from '../drop_down.js';
import { useReport } from './report.js';
import { Report } from './report.js';

export default function VATReport(props) {

  const {
    chartData,
    sales,
    total,
    header,
    dataChoice,
    quantity,
    groupBy,
    url,
    setUrl,
    handleDataChoiceSwitch,
    handleGroupBySwitch,
    setHeader,
    setChartData,
    allocateData,
    todaysDate,
    switchData
  } = useReport(props, toParent());

  const [startDate, setStartDate] = useState(todaysDate());
  const [endDate, setEndDate] = useState(todaysDate());
  // const [url, setUrl] = useState(`/api/VAT/${props.db}`)

  useEffect(() => {
    getData(startDate, endDate);
    if (props.display === 'inline') props.callBack(header);
  }, [startDate, endDate, props.db]);

  useEffect(() => {
    let header = { row1: "VAT Report", row2: todaysDate() + ' - ' + todaysDate() };
    setHeader(header);
    if (props.display === 'inline') props.callBack(header);
  }, [])

  useEffect(() => {
    switchData();
  }, [groupBy, dataChoice]);


  function toParent() {
    return {
      formatChartData: formatChartData,
      formatTableData: formatTableData
    }
  }

  function getData(start, end) {
    setUrl(`/api/VAT/${props.db}/${start}/${end}`);
  }

  function formatTableData(_data) {
    let format = f.sumAndGroup(_data, 'Id');
    format.forEach(e => { Object.assign(e, { Profit: e.Sales - e.Cost - e.Refund }) });
    return f.removeColumns(format, 'TillTime', 'TillHour', 'TillDate', 'Cat');
  }

  function idToName(e) {
    return (groupBy === 'Id') ? e['Product'] : e['Category'];
  }

  function formatChartData(response, setX) {
    let _data = f.sumAndGroup(response, groupBy)
    let axisData = (_data.length > 0) ? _data.map(e => setX(e)) : [0];
    setChartData({

      labels: _data.map(e => idToName(e)),
      datasets: [
        {
          label: 'Net Sales £',
          data: axisData,
          backgroundColor: f.colors(f.getUniqueValues(_data, groupBy))
        }
      ]
    });
  }

  const dateChange = (event) => {
    let caller = event.target;
    let newDate = caller.value;
    if (caller.id === 'startDate') {
      setHeader({ row1: "Sales By Category", row2: newDate + ' - ' + endDate })
      setStartDate(newDate);
    }
    else if (caller.id === 'endDate') {
      setHeader({ row1: "Sales By Category", row2: startDate + ' - ' + newDate })
      setEndDate(newDate);
    }
  };

  function Dates() {
    return (
      <div className='date'>
        <DateField
          id="startDate"
          label="Start Date"
          defaultValue={startDate}
          onChange={(event) => dateChange(event)}
        />
        <DateField
          id="endDate"
          label="End Date"
          defaultValue={endDate}
          onChange={(event) => dateChange(event)}
        />
      </div>
    )
  }

  function Total() {

    return (
      <div className='sales'>
        {/* <DropDown callback={handleGroupBySwitch} list={['Cat', 'Id']} title={'Group By'} /> */}
        {/* <RadioButtons handleChange={handleDataChoiceSwitch} value={dataChoice} /> */}
        <h1>Total: {(total === quantity) ? total : '£' + total.toFixed(2)}</h1>
      </div>);

  }

  return (
    <>
      <Report
        url={url}
        format={x => { return formatTableData(x) }}
        header={header}
        content={<><Total /><Dates /></>}
        callBack={props.callBack}
        display={props.display}
        allocateData={allocateData}
      />
    </>
  )
}