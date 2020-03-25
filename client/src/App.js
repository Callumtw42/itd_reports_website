import React from 'react';
import SalesByCategory from './js_modules/sales_by_category.js';
import './App.scss';
import SalesByHour from './js_modules/sales_by_hour.js'



function App() {
  return (
    <div className="App">
      <section className='boxes'>
        <div className='box'> <SalesByCategory /></div>
        <div className='box'> <SalesByHour /></div>
      </section>
    </div>
  );
}

export default App;
