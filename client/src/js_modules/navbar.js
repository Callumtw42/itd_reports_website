import React, { Component } from 'react';
import '../css_modules/navbar.scss';

class NavBar extends Component {
  render() {
    return (
      <nav className="nav">
        <div>
          <img className='logo' src='ITDlogo.jpg'></img>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Services</a>
          <a href="/">Contact</a>
        </div>
      </nav >

    )
  }
}

export default NavBar