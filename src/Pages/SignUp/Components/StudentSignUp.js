import React, { Component } from 'react';
import '../SignUp.css';
import { Link } from 'react-router-dom';

export default class StudentSignUp extends Component {
  signupSubmit = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div className='container '>
        <form
          className=' studentSignup'
          autoComplete='on'
          onSubmit={this.signupSubmit}
        >
          <h1 className='h-6 text-center'>Student Signup</h1>
          <br></br>
          <hr></hr>
          <div className='form-group my-4 '>
            <label>Your Name</label>
            <input
              type='text'
              className=' form-control'
              placeholder='Your full name'
            />
          </div>

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
              placeholder='Retype your password'
            />
          </div>
          <hr></hr>
          <div className='form-group my-4'>
            <div className='form-check form-check-inline'>
              <label className='form-check-label'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='gender'
                  value='female'
                  checked
                />
                Female
              </label>
            </div>
            <div className='form-check form-check-inline'>
              <label className='form-check-label'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='gender'
                  value='male'
                />
                Male
              </label>
            </div>
          </div>
          <div className='form-group my-4 '>
            <label>Birthday</label>
            <input type='date' className=' form-control' id='bday' />
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
            <label>Hometown</label>
            <input
              type='text'
              className=' form-control'
              placeholder="Amman\Jordan's street"
            />
          </div>
          <div className='form-group my-4 '>
            <label>Student Bio (optional)</label>
            <textarea className=' form-control' placeholder="Student's bio" />
          </div>
          <div className='text-center my-4'>
            <button type='submit' className='btn'>
              Sign Up
            </button>
          </div>
          <hr></hr>
          <br></br>
          <div>
            <h3 className='h3'>Sign Up As a Company</h3>
            <p className='p-1'>
              From <Link to='/SignUp/Company'>here</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
