import React, { useState } from 'react';
import styled from "styled-components";
import 'typeface-roboto';
import './App.scss';
import NavBar from './js_modules/navbar.js';
import FixedTimeReport from './js_modules/report/fixed_time_report.js';
import VariableTimeReport from './js_modules/report/variable_time_report.js';
import SideBar from './js_modules/sidebar.js';
import { Report } from './js_modules/report/report.js';
import VATReport from './js_modules/report/vat_report.js';

function App() {
  const [header, setHeader] = useState({ row1: 'Test1', row2: 'Test2' });
  const [sideBar, setSideBar] = useState(false);
  const [display, setDisplay] = useState({
    salesByCategory: 'none',
    salesByHour: 'inline',
    stock: 'none',
    noSales: 'none'
  });
  const [db, setDb] = useState('itdepos');

  function todaysDate() {
    var today = new Date();
    var date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2);
    return date;
  }

  return (
    <Div
      display={display}
    >
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <div className="App" >
        <meta name="viewport" content="width=1000"></meta>
        <div className='navBar'>
          <NavBar
            header={header}
            setSideBar={setSideBar}
            setDb={setDb}>
          </NavBar>
        </div>
        <SideBar
          display={sideBar}
          setSideBar={setSideBar}
          setDisplay={setDisplay}
        />
        <div className="content">

          <div className='paper' id='salesByCategory'>
            <VariableTimeReport
              db = {db}
              url = {`/api/salesByProduct/${db}/${todaysDate()}/${todaysDate()}`}
              tableFormat={x => { return x }}
              callBack={setHeader}
              display={display.salesByCategory}
              header={"Sales Breakdown"}
            />
          </div>

          <div className='paper' id='salesByHour'>
            <FixedTimeReport
             db = {db}
             url = {`/api/salesByProduct/${db}/${todaysDate()}/${todaysDate()}`}
             tableFormat={x => { return x }}
             callBack={setHeader}
             display={display.salesByHour}
             header={"Sales Breakdown"}
            />
          </div>
{/* 
          <div className='paper' id='stock'>
            <Report
              url={`/api/stock/${db}`}
              format={x => { return x }}
              callBack={setHeader}
              display={display.stock}
              header={"Stock"}
            />
          </div>

          <div className='paper'>
            <VATReport
              db={db}
              callBack={setHeader}
              display={display.salesByCategory}
            />
          </div> */}

        </div>
      </div>
    </Div>
  );
}


const Div = styled.div`

#stock{
  display: ${props => props.display.stock}
}

#salesByHour{
  display: ${props => props.display.salesByHour}
}

#salesByCategory{
  display: ${props => props.display.salesByCategory}
}

body{
  margin:0;
  padding:0;

}

.App {
  padding: 0px;
  margin: 0;
  display: grid;
  grid-template-rows: 65px 1fr;
  grid-template-areas: 
  "Navbar" 
  "content";

}

.navbar{
  grid-area: Navbar;
}

@media (min-width:64em){
  #stock{
    display: block;
    grid-area: stock;

  }

  .paper{
    overflow-y: hidden;
}

  #salesByHour{
    display: block;
    grid-area: hour;
  }

  #salesByCategory{
    display: block;
    grid-area: cat;
  }

  .content{
    margin: auto 5%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns:1fr 1fr;
    grid-template-areas: 
  "cat hour"
  "stock . "
  ;

  }
} 
`

export default App;
