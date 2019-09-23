import React, { Component } from 'react';
import './Nav.css';
import logoImg from '../../images/logo.PNG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <div className='navbar navbar-expand-lg sticky-top  '>
        {/* First Part Of The Navbar */}
        <a className='navbar-brand' href='/'>
          <img src={logoImg} className='logo' alt='' />
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarTogglerDemo03'
          aria-controls='navbarTogglerDemo03'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        {/* Second Part Of The Navbar */}
        <div className='collapse navbar-collapse' id='navbarTogglerDemo03'>
          <ul className='navbar-nav mx-auto '>
            <li className='nav-item'>
              <NavLink exact className='nav-link' to='/'>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/internships'>
                Find Internships
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink className='nav-link ' to='/about'>
                About
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link ' to='/chat'>
                Chat
                <FontAwesomeIcon color='#e74c3c' icon={faComments} />
              </NavLink>
            </li>
          </ul>
          {/* Third Part Of The Navbar */}
          <Register />
        </div>
      </div>
    );
  }
}
export default Nav;

class Register extends Component {
  render() {
    return (
      <div>
        <ul className='navbar-nav mx-auto '>
          <li className='nav-item'>
            <NavLink className='nav-link ' to='/profile'>
              Profile
            </NavLink>
          </li>
          <li className='nav-item'>
            <Link className='nav-link ' to='/login'>
              Logout <FontAwesomeIcon icon={faSignOutAlt} />
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link ' to='/login'>
              Sign In <FontAwesomeIcon icon={faSignInAlt} />
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
