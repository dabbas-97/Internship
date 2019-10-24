import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export function RegisterNav(props) {
  const userSignedIn = () => {
    if (true) return (<li className='nav-item dropdown'>
      <Link className='nav-link  dropdown-toggle' data-toggle="dropdown" to='#'>
        Profile
    </Link>
      <div className=' dropdown-menu'>

        <Link className='dropdown-item ' to='/profile'>
          My Profile
    </Link>

        <Link className='dropdown-item ' to='/login'>
          Logout <FontAwesomeIcon icon={faSignOutAlt} />
        </Link>

      </div>
    </li>)
    else return (<li className='nav-item'>
      <Link className='nav-link ' to='/login'>
        Login <FontAwesomeIcon icon={faSignInAlt} />
      </Link>
    </li>)
  }
  return (
    <div className=' profilelogin'>
      <ul className='navbar-nav mx-auto '>
        {userSignedIn()}
      </ul>
    </div>
  );
}
