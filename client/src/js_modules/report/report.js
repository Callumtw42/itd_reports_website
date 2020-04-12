import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as f from '../functions.js';
import EnhancedTable from '../table.js';
import HeaderBar from '../header_bar.js';
import Paper from '@material-ui/core/Paper';
import 'date-fns';

export function useReport(props) {

  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [url, setUrl] = useState(props.url);

  useEffect(() => {
    if (props.display === 'inline') props.callBack(props.header);
  }, [props.display, props.header]);

  useEffect(() => {
    fetchData(url, allocateData);
  }, [props.url, props.db]);

  function todaysDate() {
    var today = new Date();
    var date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2);
    return date;
  }

  function allocateData(_data) {
    setTableData(props.tableFormat(_data));
  }

  const fetchData = (url, allocateData) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        allocateData(data);
        console.log(data)
      })
      .catch((error) => {
      })
  }

  return {
    data,
    tableData,
    url,
    setUrl,
    setTableData,
    todaysDate,
    fetchData,
  }
}

export function Report(props) {

  const {
    data,
    tableData,
    setTableData,
    fetchData
  } = useReport(props);

  function Content() {
    return (f.exists(props.content)) ? props.content : <div></div>
  }

  return (

    <Div>
      <Paper className='paper'>
        <HeaderBar header={props.header}></HeaderBar>
        <div className='report'>
          <Content />
          <EnhancedTable data={tableData} />
        </div>
      </Paper>
    </Div>

  );
}

const Div = styled.div`
.header {
  font-size: 42px;
  background-color: rgba(0, 64, 101, 0.6);
  color: white;
  text-align: left;
  padding: 10px;
  box-shadow: 0 1px 1px rgba(104, 104, 104, 0.8);
}

.header >p{
  margin: auto;
}

.report {
  max-width: 100vw; 
  display: flex;
  flex-direction: column;
  background: var(--primary);
  text-align: center;
  box-shadow: var(--shadow);
  overflow-y: scroll;
  z-index: -1;
}

.MuiInputBase-root{
  font-size: 3em;
}

.MuiFormLabel-root{
  font-size: 3em;
}

.paper{
margin: 5px;
}

.sales > h1{
  font-size: 32px;
  margin: auto 0;
  margin-right: 5%;
}

.sales {
  margin: 7em 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.date {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;

}

@media (min-width:64em){

  .MuiInputBase-root{
    font-size: 1em;
  }

  .MuiFormLabel-root{
    font-size: 1em;
  }

  .report {
    max-height: 65vh;
  }

  .sales > h1{
    font-size: 1em;
    }

    .sales {
    margin: 1em 0 0 0;
    }

}

`;