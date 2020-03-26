import React, { Component } from 'react';
import SalesByCategory from './js_modules/sales_by_category.js';
import SalesByHour from './js_modules/sales_by_hour.js'
import NavBar from './js_modules/navbar.js';
import './App.scss';




function App() {
  return (
    <div>
      <NavBar></NavBar>
      <div className="App">
        <section className='boxes'>
          <div> <SalesByCategory /></div>
          <div> <SalesByHour /></div>
          <div> <SalesByCategory /></div>
          <div> <SalesByHour /></div>
        </section>
      </div>
    </div>
  );
}

export default App;
