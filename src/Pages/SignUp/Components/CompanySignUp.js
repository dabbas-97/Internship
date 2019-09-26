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
          <hr></hr>

          <div className='form-group my-4 '>
            <label for='emailAddress'>Email address</label>
            <input
              type='email'
              className=' form-control'
              id='emailAddress'
              placeholder='Enter your email'
            />
          </div>
          <div className='form-group my-4 '>
            <label for='password'>Passowrd</label>
            <input
              type='password'
              className='form-control'
              id='userPassword'
              placeholder='Type your password'
            />
            <input
              type='password'
              className='form-control mt-2'
              id='userPassword'
              placeholder='Retype your password'
            />
          </div>
          <div className='form-group my-4 '>
            <label for='companyname'>Company Name</label>
            <input
              type='text'
              className=' form-control'
              id='emailAddress'
              placeholder='Name of the company'
            />
          </div>
          <div className='form-group my-4 '>
            <label for='phonenumber'>Phone Number</label>
            <input
              type='tel'
              className=' form-control'
              id='phoneNumber'
              placeholder='079XXXXXXX'
              maxLength='10'
              required
            />
          </div>
          <div className='form-group my-4 '>
            <label>Location</label>
            <input
              className=' form-control'
              placeholder='Amman\Jordan street'
            />
          </div>
          <div className='form-group my-4 '>
            <label>Company's Bio (optional)</label>
            <textarea
              className=' form-control'
              id='emailAddress'
              placeholder="Company's bio"
            />
          </div>
          <div className='text-center my-4'>
            <button type='submit' className='btn'>
              Sign Up
            </button>
          </div>
          <hr></hr>
          <br></br>
          <div>
            <h3 className='h3'>You're a student?</h3>
            <p className='p-1'>
              Sign Up <Link to='/SignUp/Student'>here</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
