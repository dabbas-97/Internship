import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';

export function RegisterNav() {
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
            Login <FontAwesomeIcon icon={faSignInAlt} />
          </Link>
        </li>
      </ul>
    </div>
  );
}
