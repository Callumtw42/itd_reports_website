import React, { Component } from 'react';
import styled from 'styled-components';

class NavBar extends Component {
  render() {
    return (
      <Div>
        <nav className="nav">
          <img className='logo' src='ITDlogo.jpg'></img>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Services</a>
          <a href="/">Contact</a>
        </nav >
      </Div>
    )
  }
}

const Div = styled.div`
@import "./global.scss";

* {
  overflow-x: visible;
  font-family: Verdana, Geneva, sans-serif;
}

.nav {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background-color: #004064;
  // overflow: hidden;
  box-shadow: 0 1px 3px rgba(104, 104, 104, 0.8);
  font-size: 34pt;
}

.nav {
  display: grid;
  grid-auto-flow: column;
}

.nav > a {
  justify-self: left;
  color: #f2f2f2;
  text-decoration: none;
  text-align: left;
  padding: 60px 0px 0px 0px;
  display: block;
  height: 100%;
  width: 100%;
}

.nav > img {
  height: 150px;
  width: 150px;
  padding: 10px 0px 10px 10px;
}

.nav > a:hover {
  background-color: #ddd;
  color: #000;
}

// @media (min-width: 1000px) {
//   .nav {
//     grid-template-columns: 1fr 2fr;
//   }

//   .nav > div > a {
//     padding: 50px 30px;
//     font-size: 17px;
//   }

//   .nav > div > img {
//     height: 85px;
//     width: 85px;
//     padding: 10px 10px;
//   }
// }

// @media(min-width:568px){
//   /*.open-slide{display:none}*/
// }
`

export default NavBar