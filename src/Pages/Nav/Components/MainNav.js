import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { withRouter, NavLink } from 'react-router-dom';
import { useAuth, db } from '../../../Auth'
import { Spinner } from 'react-bootstrap'


const MainNav = ({ history }) => {


  const [type, setType] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [logged, setLogged] = useState(false)
  const { auth } = useAuth();

  useEffect(() => {

    if (logged) {
      db.collection('users').doc(auth.user.uid).get().then(doc => {
        setType(doc.data().type)
        setLoaded(true)
      })
    } else setLoaded(false)

    return () => {
      setLoaded(false)
    }
  }, [logged])

  useEffect(() => {
    if (auth.user) {
      setLogged(true)
    } else setLogged(false)
    return () => {
      setLogged(false)
    };
  }, [auth.user])

  const loggedIn = () => {
    if (logged) {
      if (loaded) {
        if (type === 'student') {
          return (
            <React.Fragment>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/internships'>
                  Seek opportunities
        </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link ' to='/chat'>
                  Chat
          <FontAwesomeIcon color='#e74c3c' icon={faComments} />
                </NavLink>
              </li>
            </React.Fragment>
          )
        } else return (
          <React.Fragment>
            <li className='nav-item'>
              <NavLink className='nav-link ' to='/chat'>
                Chat
          <FontAwesomeIcon color='#e74c3c' icon={faComments} />
              </NavLink>
            </li>
          </React.Fragment>
        )
      } else return (
        <Spinner animation="border" role="status" variant="info" >
          <span ></span>
        </Spinner>
      )
    }

  }

  return (<React.Fragment>
    <ul className='navbar-nav mx-auto '>
      <li className='nav-item'>
        <NavLink exact className='nav-link' to='/'>
          Home
  </NavLink>
      </li>

      {loggedIn()}
      <li className='nav-item'>
        <NavLink className='nav-link ' to='/about'>
          About
  </NavLink>
      </li>
    </ul>
  </React.Fragment>)










}
export default withRouter(MainNav)