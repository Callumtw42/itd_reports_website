import React, { useState } from 'react';
import styled from "styled-components";
import 'typeface-roboto';
import './App.scss';
import NavBar from './js_modules/navbar.js';
import SalesByCategory from './js_modules/sales_by_category.js';
import SalesByHour from './js_modules/sales_by_hour.js';
import Stock from './js_modules/stock.js';
import SideBar from './js_modules/sidebar.js';

function App() {
  const [header, setHeader] = useState({ row1: 'Test1', row2: 'Test2' });
  const [sideBar, setSideBar] = useState(false);
  const [displaySalesByCategory, setDisplaySalesByCategory] = useState('inline');
  const [displaySalesByHour, setDisplaySalesByHour] = useState('none');
  const [displayStock, setDisplayStock] = useState('none');
  // const [currentPage, setCurrentPage] = useState('SalesByCategory');

  // useEffect(() => {

  // }, [header]);


  return (
    <Div
      displaySalesByHour={displaySalesByHour}
      displayStock={displayStock}
      displaySalesByCategory={displaySalesByCategory}

    >
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <div className="App" >
        <meta name="viewport" content="width=1000"></meta>
       <div className='navBar'><NavBar  header={header} setSideBar={setSideBar}></NavBar></div>
        <SideBar
          display={sideBar}
          setSideBar={setSideBar}
          setDisplaySalesByCategory={setDisplaySalesByCategory}
          setDisplaySalesByHour={setDisplaySalesByHour}
          setDisplayStock={setDisplayStock}
        >
        </SideBar>
        <div className="content">
          {/* <section className='boxes'> */}

          <div className='salesByHour'>
            <SalesByHour
              callBack={setHeader}
              display={displaySalesByHour}
            />
          </div>

          <div className='stock'>
            <Stock
              callBack={setHeader}
              display={displayStock}
            />
          </div>

          <div className='salesByCategory'>
            <SalesByCategory
              callBack={setHeader}
              display={displaySalesByCategory}
            />

          </div>
          {/* </section> */}
        </div>
      </div>
    </Div>
  );
}


const Div = styled.div`

.stock{
  display: ${props => props.displayStock}
}

.salesByHour{
  display: ${props => props.displaySalesByHour}
}

.salesByCategory{
  display: ${props => props.displaySalesByCategory}
}

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

  /* @media only screen and (min-device-width: 1000px){ */
@media (min-width:64em){
  .stock{
    display: inline-grid;
    grid-area: stock;
    overflow: hidden;
  }

  .navBar{
    display: none;
  }

  .salesByHour{
    display: inline-grid;
    grid-area: hour;
    overflow: hidden;
  }

  .salesByCategory{
    display: inline-grid;
    grid-area: cat;
    overflow: hidden;
  }

  .content{
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: 
  "stock hour cat";
  }
} 

`

export default App;
