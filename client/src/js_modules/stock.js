import 'date-fns';
import React, { useEffect, useState } from 'react';
import * as f from './functions.js';
import EnhancedTable from './table.js';
import styled from 'styled-components';
import HeaderBar from './header_bar.js';

export default function Stock(props) {

  const [tableData, setTableData] = useState([]);
  const [header]= useState("Stock");

  const fetchData = (url, ...allocations) => {
    fetch(url)
      .then(res => res.json())
      .then(data => allocateData(data, ...allocations))
      .catch((error) => {
      })
  }
  
  function allocateData(data, formatTableData) {
    formatTableData(data);
  }

  function getData() {
    fetchData(`/api/stock/${props.db}`, formatTableData);
  }

  useEffect(() => {
    getData();
    if (props.display === 'inline') props.callBack(header);
  }, [props.db]);

  useEffect(() => {
    if (props.display === 'inline') props.callBack(header);
  }, [props.display]);

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

@media (min-width:64em){
.table{
  position: relative;
  max-height: 65vh;
  overflow-y: scroll;
}
}
`