import React, { Component } from 'react';
import SalesByCategory from './js_modules/sales_by_category.js';
import SalesByHour from './js_modules/sales_by_hour.js'
import NavBar from './js_modules/navbar.js';
import './App.scss';
import PieChart from './js_modules/pie_chart.js';
import styled from "styled-components";
import 'typeface-roboto';

function App() {
  return (
    <Div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <div className="App" >
        <meta name="viewport" content="width=1000"></meta>
        <NavBar className="navbar"></NavBar>
        <div className="content">
          {/* <section className='boxes'> */}
          <div> <SalesByCategory /></div>
          {/* <div> <SalesByHour /></div> */}
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
`

export default App;
