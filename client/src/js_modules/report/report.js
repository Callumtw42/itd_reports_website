import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import * as f from '../functions.js';
import EnhancedTable from '../table.js';
import HeaderBar from '../header_bar.js';
import Paper from '@material-ui/core/Paper';

export const fetchData = (url, allocateData) => {
  fetch(url)
    .then(res => res.json())
    .then(data => allocateData(data))
    .catch((error) => {
    })
}

export function Report(props) {

  const [tableData, setTableData] = useState([0]);

  useEffect(() => {
    setTableData(props.tableData)
  },[props.tableData]);

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

}

`;