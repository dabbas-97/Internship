import React from 'react';
import logoImg from '../../../images/logo.PNG';
import { NavLink } from 'react-router-dom';
export function Logo() {
  return (
    <React.Fragment>
      <NavLink className='' to='/'>
        <img src={logoImg} className='logo' alt='' />
      </NavLink>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarToggler'
        aria-controls='navbarToggler'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
    </React.Fragment>
  );
}
