import React, { Component } from 'react';
import '../SignUp.css';
import { Link } from 'react-router-dom';

export default class CompanySignUp extends Component {
  signupSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className='container '>
        <form onSubmit={this.signupSubmit}>
          <h1 className='h-6 text-center'>Company Signup</h1>
          <br></br>
          <div class='form-group my-4 '>
            <label for='emailAddress'>Email address</label>
            <input
              type='email'
              className=' form-control'
              id='emailAddress'
              placeholder='Enter your email'
            />
          </div>
          <div class='form-group my-4 '>
            <label for='password'>Passowrd</label>
            <input
              type='password'
              className='form-control'
              id='userPassword'
              placeholder='Enter your password'
            />
          </div>
          <div className='text-center my-4'>
            <button type='submit' className='btn'>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
