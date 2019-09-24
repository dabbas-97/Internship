import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
export function MainNav() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
