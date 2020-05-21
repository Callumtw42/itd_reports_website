import React, { useState } from 'react';
import CashierHistory from './modules/reports/cashier_history'
import ReturnToSupplier from './modules/reports/return_to_supplier'
import VoidSales from './modules/reports/void_sales'
import Refund from './modules/reports/refund'
import StaffHours from './modules/reports/staff_hours'
import Wastage from './modules/reports/wastage'
import PriceOverride from './modules/reports/price_override'
import VoucherSales from './modules/reports/voucher_sales'
import ExpiryDates from './modules/reports/expiry_dates';
import ProductExchange from './modules/reports/product_exchange'
import CustomerCredit from './modules/reports/customer_credit'
import styled from "styled-components";
import 'typeface-roboto';
import './App.scss';
import NavBar from './modules/navbar';
import { SalesBreakdown } from './modules/reports/sales_breakdown';
import SideBar from './modules/sidebar';
import { Stock } from './modules/reports/stock';
import { VAT } from './modules/reports/vat_report';

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
            <SalesBreakdown
              header={'Sales Breakdown'}
              db={db}
              setHeader={setHeader}
              phoneDisplay={display.salesByCategory}
            />
          </div>

          <div className='paper' id='CustomerCredit'>
          <CashierHistory
              header={'Cashier History'}
              db={db}
              setHeader={setHeader}
              phoneDisplay={display.stock}
            />
          </div>
          
          <div className='paper' id='stock'>
            <Stock
              header={'Stock'}
              db={db}
              setHeader={setHeader}
              phoneDisplay={display.stock}
            />
          </div>

          <div className='paper' id='VAT'>
            <VAT
              header={'VAT'}
              db={db}
              setHeader={setHeader}
              phoneDisplay={display.stock}
            />
          </div>

          <div className='paper' id='CustomerCredit'>
            <PriceOverride
              header={'Price Override Report'}
              db={db}
              setHeader={setHeader}
              phoneDisplay={display.stock}
            />
          </div>

          <div className='paper' id='CustomerCredit'>
            <Wastage
              header={'Wastage'}
              db={db}
              setHeader={setHeader}
              phoneDisplay={display.stock}
            />
          </div>

          <div className='paper' id='CustomerCredit'>
            <Refund
              header={'Refund Report'}
              db={db}
              setHeader={setHeader}
              phoneDisplay={display.stock}
            />
          </div>

          <div className='paper' id='CustomerCredit'>
            <StaffHours
              header={'Staff Hours'}
              db={db}
              setHeader={setHeader}
              phoneDisplay={display.stock}
            />
          </div>

          <div className='paper' id='CustomerCredit'>
            <VoidSales
              header={'Void Sales'}
              db={db}
              setHeader={setHeader}
              phoneDisplay={display.stock}
            />
          </div>

          <div className='paper' id='CustomerCredit'>
            <ReturnToSupplier
              header={'Return To Supplier'}
              db={db}
              setHeader={setHeader}
              phoneDisplay={display.stock}
            />
          </div>

          <div className='paper' id='CustomerCredit'>
            <CustomerCredit
              header={'Customer Credit'}
              db={db}
              setHeader={setHeader}
              phoneDisplay={display.stock}
            />
          </div>

          <div className='paper' id='CustomerCredit'>
            <ProductExchange
              header={'Product Exchange'}
              db={db}
              setHeader={setHeader}
              phoneDisplay={display.stock}
            />
          </div>

          <div className='paper' id='CustomerCredit'>
            <ExpiryDates
              header={'Expiry Dates'}
              db={db}
              setHeader={setHeader}
              phoneDisplay={display.stock}
            />
          </div>

          <div className='paper' id='CustomerCredit'>
            <VoucherSales
              header={'Voucher Sales'}
              db={db}
              setHeader={setHeader}
              phoneDisplay={display.stock}
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
    margin: auto 5%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns:1fr 1fr;
    grid-template-areas: 
  "cat cat"
  "stock hour "
  ". ."
  ;

  }
} 
`

export default App;
