import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import { auth } from '../../../Config/fbConfig'

class RegisterNav extends Component {
  state = { redirect: false, isLoggedin: false }
  render() {

    const logout = () => {
      auth.signOut().then(() => this.setState({ redirect: true }))
    }
    const redirect = () => {
      const { redirect } = this.state
      if (redirect === true) {
        this.setState({ redirect: false })
        return <Redirect to="/" />
      }
    }

    auth.onAuthStateChanged(user => {
      console.log(user)
    })

    const userSignedIn = () => {
      if (this.state.isLoggedin) return (<li className='nav-item dropdown'>
        <Link className='nav-link  dropdown-toggle' data-toggle="dropdown" to='#'>
          Profile
    </Link>
        <div className=' dropdown-menu'>

          <Link className='dropdown-item ' to='/profile'>
            My Profile
    </Link>

          <button className='dropdown-item ' type='button' onClick={() => logout}>
            Logout <FontAwesomeIcon icon={faSignOutAlt} />
          </button>

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
          {redirect()}
        </ul>
      </div>
    );
  }
}
export default RegisterNav