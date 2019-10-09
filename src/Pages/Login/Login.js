import React, { Component } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import logoImg from '../../images/logo.PNG';
export default class Login extends Component {
  loginSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className='container '>
        <form onSubmit={this.loginSubmit} className='formLog'>
          <img src={logoImg} className='logo' alt='' />
          <h1 className='h-6 text-center'>Login</h1>
          <br></br>
          <hr></hr>

          <div className='form-group my-4 '>
            <label htmlFor='emailAddress'>Email address</label>
            <input
              type='email'
              className=' form-control'
              id='emailAddress'
              placeholder='Enter your email'
            />
          </div>
          <div className='form-group my-4 '>
            <label htmlFor='password'>Passowrd</label>
            <input
              type='password'
              className='form-control'
              id='userPassword'
              placeholder='Enter your password'
            />
          </div>

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
}
