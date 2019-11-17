import React from 'react';
import { FiUser } from 'react-icons/fi'
import { Link, withRouter, NavLink } from 'react-router-dom';
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io'

import { useAuth } from '../../../Auth'

const RegisterNav = ({ history }) => {

  const { auth } = useAuth();

  if (auth.user) return (
    <div className=' profilelogin'>
      <ul className='navbar-nav mx-auto '>
        <li className='nav-item dropdown'>
          <Link className='nav-link  dropdown-toggle' data-toggle="dropdown" to='#'>
            <FiUser />
          </Link>
          <div className=' dropdown-menu'>

            <Link className='dropdown-item ' to='/profile'>
              My Profile
           </Link>

            <button className='dropdown-item ' type='button' onClick={() => auth.signout().then(() => history.push('/')).catch(err => console.log(err.message))}>
              Logout <IoMdLogOut />
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
            Login <IoMdLogIn />
          </NavLink>
        </li>
      </ul>
    </div>)



}
export default withRouter(RegisterNav)
