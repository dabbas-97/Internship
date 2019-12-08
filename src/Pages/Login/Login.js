import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, withRouter, Redirect } from 'react-router-dom';
import logoImg from '../../images/logo.PNG';

import { useAuth, db } from '../../Auth'

const Login = ({ history }) => {
  const [user, setUser] = useState({ email: '', password: '' })
  const { auth } = useAuth()
  const [error, setError] = useState(null);
  const [type, setType] = useState(null);
  const loginSubmit = async e => {
    e.preventDefault();
    const { email, password } = user
    auth.signin(email, password).catch(err => setError(err.message))
  };

  useEffect(() => {
    if (auth.user) {
      db.collection('users').doc(auth.user.uid).get()
        .then(doc => {
          if (doc.exists) setType(doc.data().type)
          else {
            setError('There is no user record corresponding to this identifier. The user may have been deleted.')
            auth.user.delete().catch(err => {
              auth.signout()
            })
          }
        })
    }

  }, [auth.user])

  if (auth.user && type) {
    return <Redirect to='/' />
  }


  const errorMessage = () => {
    if (error) {
      return (
        <div className='invalid-feedback text-center my-3'>{error}</div>
      )
    }
  }

  return (
    <div className='container '>
      <form onSubmit={loginSubmit} className='formLog'>
        <img src={logoImg} className='logo' alt='' />
        <h1 className='h-6 text-center'>Login</h1>
        <br></br>
        <hr></hr>

        <div className='form-group my-4 '>
          <label htmlFor='emailAddress'>Email address</label>
          <input
            type='email'
            className=' form-control'
            placeholder='Enter your email'
            onChange={e => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div className='form-group my-4 '>
          <label htmlFor='password'>Passowrd</label>
          <input
            type='password'
            className='form-control'
            onChange={e => setUser({ ...user, password: e.target.value })}
            placeholder='Enter your password'
            required
          />
        </div>
        {errorMessage()}
        <div className='text-center my-4'>
          <button type='submit' className='btn'>
            Sign In
            </button>
        </div>

        <hr></hr>

        <div>
          <h3 className='h3'>Not a member?</h3>
          <p className='p-1'>
            Sign Up <Link to='/SignUp'>here</Link>
          </p>
        </div>
      </form>
    </div>
  );

}
export default withRouter(Login)