import 'date-fns';
import React, { useEffect, useState } from 'react';
import DateField from './date_field.js';
import * as f from './functions.js';
import PieChart from './pie_chart.js';
import { fetchData, Report, todaysDate } from './report.js';
import EnhancedTable from './table.js';
import styled from 'styled-components';
import HeaderBar from './header_bar.js'

export default function Stock(props) {

  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [totalSales, setTotalSales] = useState(0);
  const [startDate, setStartDate] = useState(todaysDate());
  const [endDate, setEndDate] = useState(todaysDate());
  const [header, setHeader] = useState("Stock");

  const fetchData = (url, ...allocations) => {
    fetch(url)
      .then(res => res.json())
      .then(data => allocateData(data, ...allocations))
      .catch((error) => {
      })
  }
  //
  function allocateData(data, formatTableData) {
    formatTableData(data);
  }

  function getData(start, end) {
    fetchData(`/api/stock/${props.db}`, formatTableData);
  }

  useEffect(() => {
    getData(startDate, endDate);
    if (props.display === 'inline') props.callBack(header);
  }, [startDate, endDate, props.db]);

  useEffect(() => {
    if (props.display === 'inline') props.callBack(header);
  }, [props.display]);

  function formatChartData(salesData) {
    let _data = (salesData.length > 0) ? salesData.map(saleCat => saleCat.Sales) : [0];
    setChartData({

      labels: salesData.map(saleCat => saleCat.Category),
      datasets: [
        {
          label: 'Net Sales £',
          data: _data,
          backgroundColor: f.colors(f.getUniqueValues(salesData, 'Cat'))
        }
      ]
    });
  }

  function formatTableData(data) {
    f.dbg(data);
    data.forEach(e => e.LastUpdate = e.LastUpdate.substr(0, 10) + ' - ' + e.LastUpdate.substring(11, 19));
    f.dbg(data);
    setTableData(f.removeColumns(data, 'Cat'))
  }

  return (
    <Div className = 'root'>
      <HeaderBar header = {header}></HeaderBar>
      <div className = 'table'><EnhancedTable data={tableData} /></div>
      </Div>
  )
}

const Div = styled.div`

/* .root{
  position: relative;
    max-height: 200px;
} */

@media (min-width:64em){
.table{
  position: relative;
  max-height: 65vh;
  overflow-y: scroll;
}
}
`