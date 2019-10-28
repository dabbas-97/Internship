import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { withRouter, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Auth'
import { db } from '../../../Config/fbConfig'

const MainNav = ({ history }) => {

  const { currentUser } = useContext(AuthContext);
  const [type, setType] = useState('')


  const signedInNavs = () => {
    const studentUser = () => {
      if (type === 'student') return (
        <li className='nav-item'>
          <NavLink className='nav-link' to='/internships'>
            Seek opportunities
           </NavLink>
        </li>)
    }
    if (currentUser) {
      const id = currentUser.uid

      db.collection('users').doc(id).get().then(doc => setType(doc.data().type)).catch(err => console.log(err.message))
      return (<React.Fragment>
        {studentUser()}
        <li className='nav-item'>
          <NavLink className='nav-link ' to='/chat'>
            Chat
       <FontAwesomeIcon color='#e74c3c' icon={faComments} />
          </NavLink>
        </li>
      </React.Fragment>)
    }
  }

  return (
    <React.Fragment>
      <ul className='navbar-nav mx-auto '>
        <li className='nav-item'>
          <NavLink exact className='nav-link' to='/'>
            Home
          </NavLink>
        </li>
        {signedInNavs()}
        <li className='nav-item'>
          <NavLink className='nav-link ' to='/about'>
            About
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );
}
export default withRouter(MainNav)