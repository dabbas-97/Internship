import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FiUser } from 'react-icons/fi'
import { Link, withRouter, NavLink } from 'react-router-dom';

import { useAuth } from '../../../Auth'

const RegisterNav = ({ history }) => {

  const { auth } = useAuth();


  if (auth.user) return (
    <div className=' profilelogin'>
      <ul className='navbar-nav mx-auto '>
        <li className='nav-item dropdown'>
          <Link className='nav-link  dropdown-toggle' data-toggle="dropdown" to='#'>
            <FiUser /> {auth.user.displayName}
          </Link>
          <div className=' dropdown-menu'>

            <Link className='dropdown-item ' to='/profile'>
              My Profile
           </Link>

            <button className='dropdown-item ' type='button' onClick={() => auth.signout().then(() => history.push('/'))}>
              Logout <FontAwesomeIcon icon={faSignOutAlt} />
            </button>

          </div>
        </li>
      </ul>
    </div>)

  return (
    <div className=' profilelogin'>
      <ul className='navbar-nav mx-auto '>
        <li className='nav-item'>
          <NavLink className='nav-link ' to='/login'>
            Login <FontAwesomeIcon icon={faSignInAlt} />
          </NavLink>
        </li>
      </ul>
    </div>)



}
export default withRouter(RegisterNav)