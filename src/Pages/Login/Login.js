import React, { useState } from 'react';
import './Login.css';
import { Link, withRouter, Redirect } from 'react-router-dom';
import logoImg from '../../images/logo.PNG';

import { useAuth } from '../../Auth'

const Login = ({ history }) => {
  const [user, setUser] = useState({ email: '', password: '' })
  const { auth } = useAuth()
  const [error, setError] = useState(null);
  const loginSubmit = e => {
    e.preventDefault();
    const { email, password } = user
    auth.signin(email, password).catch(err => setError(err.message))

  };

  if (auth.user) {
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