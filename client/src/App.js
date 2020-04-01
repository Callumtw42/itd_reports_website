import React, { Component, useState, useEffect } from 'react';
import SalesByCategory from './js_modules/sales_by_category.js';
import SalesByHour from './js_modules/sales_by_hour.js'
import NavBar from './js_modules/navbar.js';
import './App.scss';
import PieChart from './js_modules/pie_chart.js';
import styled from "styled-components";
import 'typeface-roboto';
import AppBar from '@material-ui/core/AppBar';
import SideBar from './js_modules/sidebar.js';

function App() {
  const [header, setHeader] = useState({ row1: 'Test1', row2: 'Test2' });
  const [sideBar, setSideBar] = useState(false);
  const [displaySalesByCategory, setDisplaySalesByCategory] = useState('inline');
  const [displaySalesByHour, setDisplaySalesByHour] = useState('none');
  // const [currentPage, setCurrentPage] = useState('SalesByCategory');

  // useEffect(() => {

  // }, [header]);


  return (
    <Div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <div className="App" >
        <meta name="viewport" content="width=1000"></meta>
        <NavBar header={header} setSideBar={setSideBar}></NavBar>
        <SideBar
          display={sideBar}
          setSideBar={setSideBar}
          setDisplaySalesByCategory={setDisplaySalesByCategory}
          setDisplaySalesByHour={setDisplaySalesByHour}>
        </SideBar>
        <div className="content">
          {/* <section className='boxes'> */}

          <div style={{ display: displaySalesByHour }}>
            <SalesByHour
              callBack={setHeader}
              display = {displaySalesByHour}
            />
            {console.log("Hour - Re-render")}
          </div>
          <div style={{ display: displaySalesByCategory }}>
            <SalesByCategory
              callBack={setHeader}
              display = {displaySalesByCategory}
            />
            {console.log("Cat - Re-render")}
          </div>
          {/* </section> */}
        </div>
      </div>
    </Div>
  );
}


const Div = styled.div`

body{
  margin:0;
  padding:0;
}

.App{
  padding: 0px;
  margin: 0;
  display: grid;
  grid-template-rows: 150px 1fr;
  grid-template-areas: 
  "Navbar" 
  "content";
}

.navbar{
  grid-area: Navbar;
}

.boxes{
  display: grid;
   grid-template-columns:1fr;
  padding: 10px;
  grid-area: content;
}

/* .test{
  display: none;
}

@media (min-width: 1200px) {
.test{
  
} */
`

export default App;
