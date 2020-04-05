import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import 'typeface-roboto';
import './App.scss';
import NavBar from './js_modules/navbar.js';
import SalesByCategory from './js_modules/sales_by_category.js';
import SalesByHour from './js_modules/sales_by_hour.js';
import Stock from './js_modules/stock.js';
import SideBar from './js_modules/sidebar.js';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import * as f from './js_modules/functions.js';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     // width: '100%',
//     // marginBottom: theme.spacing(2),
//     // overflow: 'scroll'
//     margin: '5px'
//   },//
// }));

function App() {
  const [header, setHeader] = useState({ row1: 'Test1', row2: 'Test2' });
  const [sideBar, setSideBar] = useState(false);
  const [displaySalesByCategory, setDisplaySalesByCategory] = useState('none');
  const [displaySalesByHour, setDisplaySalesByHour] = useState('inline');
  const [displayStock, setDisplayStock] = useState('none');
  const [db, setDb] = useState('itdepos');

  // useEffect(() =>{
  //   f.dbg("XXX");
  // }, [db]);

  // const classes = useStyles();
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
        <div className='navBar'><NavBar
          header={header}
          setSideBar={setSideBar}
          setDb={setDb}>
        </NavBar></div>
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


          <Paper className='paper' id='stock'>
            <Stock
              db={db}
              callBack={setHeader}
              display={displayStock}
            />
          </Paper>

          <Paper className='paper' id='salesByCategory'>
            <SalesByCategory
              db={db}
              callBack={setHeader}
              display={displaySalesByCategory}
            />

          </Paper>

          <Paper className='paper' id='salesByHour'>
            <SalesByHour
              db={db}
              callBack={setHeader}
              display={displaySalesByHour}
            />
          </Paper>
          {/* </section> */}
        </div>
      </div>
    </Div>
  );
}


const Div = styled.div`

#stock{
  display: ${props => props.displayStock}
}

#salesByHour{
  display: ${props => props.displaySalesByHour}
}

#salesByCategory{
  display: ${props => props.displaySalesByCategory}
}

body{
  margin:0;
  padding:0;

}

.paper{
margin: 5px;
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

/* .boxes{
  display: grid;
  grid-template-columns:1fr;
  padding: 10px;
  grid-area: content;
} */

  /* @media only screen and (min-device-width: 1000px){ */
@media (min-width:64em){
  #stock{
    display: block;
    grid-area: stock;

  }

  #salesByHour{
    display: block;
    grid-area: hour;
  }

  #salesByCategory{
    display: block;
    grid-area: cat;
  }

  .paper{
    overflow-y: hidden;
}

  .content{
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns:1fr 1fr 1fr;
    grid-template-areas: 
  "stock hour cat"
  ". . ."
  ;
  /* max-height: 70vh; */

  }
} 

`

export default App;
