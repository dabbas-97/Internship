import React, { Component } from 'react';
import './Nav.css';
import { Logo } from './Components/Logo';
import { RegisterNav } from './Components/RegisterNav';
import { MainNav } from './Components/MainNav';

class Nav extends Component {
  render() {
    return (
      <div className='navbar navbar-expand-lg sticky-top  '>
        <Logo />
        <div className='collapse navbar-collapse' id='navbarTogglerDemo03'>
          <MainNav />
          <RegisterNav />
        </div>
      </div>
    );
  }
}
export default Nav;
