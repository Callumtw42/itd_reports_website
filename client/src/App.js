import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import 'typeface-roboto';
import './App.scss';
import NavBar from './js_modules/navbar.js';
import SalesByCategory from './js_modules/report/sales_by_category.js';
import SalesByHour from './js_modules/report/sales_by_hour.js';
import SalesByProduct from './js_modules/report/sales_by_product.js';
import SideBar from './js_modules/sidebar.js';
import SimpleReport from './js_modules/report/simple_report.js';

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

  return (
    <Div
      display = {display}
    >
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <div className="App" >
        <meta name="viewport" content="width=1000"></meta>
        <div className='navBar'><NavBar
          header={header}
          setSideBar={setSideBar}
          setDb={setDb}>
        </NavBar></div>
        <SideBar
          display={sideBar}
          setSideBar={setSideBar}
          setDisplay = {setDisplay}
        >
        </SideBar>
        <div className="content">

          <div className='paper' id='stock'>
            <SimpleReport
              header={'Stock'}
              url={`/api/stock/${db}`}
              db={db}
              callBack={setHeader}
              display={display.stock}
            />
          </div>

          {/* <div className='paper' id='noSales'>
            <SimpleReport
              header={'No Sales'}
              url={`/api/noSales/${db}`}
              db={db}
              callBack={setHeader}
              display={display.stock}
            />
          </div> */}

          <div className='paper' id='salesByCategory'>
            <SalesByCategory
              db={db}
              callBack={setHeader}
              display={display.salesByCategory}
            />

          </div>

          <div className='paper' id='salesByHour'>
            <SalesByHour
              db={db}
              callBack={setHeader}
              display={display.salesByHour}
            />
          </div>

          <div className='paper' id='salesByProduct'>
            <SalesByProduct
              db={db}
              callBack={setHeader}
              display={display.salesByHour}
            />
          </div>
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
