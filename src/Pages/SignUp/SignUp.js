import React, { Component } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';

export default class SignUp extends Component {
  state = {
    signup: [
      {
        step: 1,
        name: '',
        email: '',
        password: '',
        sex: '',
        bday: '',
        phone: '',
        city: '',
        bio: ''
      },
      {
        step: 1,
        name: '',
        email: '',
        password: '',
        phone: '',
        city: '',
        bio: ''
      }
    ]
  };
  render() {
    return (
      <div className='container '>
        <form className='Signup-form'>
          <h1 className='h-1 text-center'>Sign Up</h1>

          <br></br>
          <hr></hr>
          <br></br>
          <div className='text-center my-4 px-5 '>
            <Link to='/SignUp/Student' className='btn'>
              Sign up as a student
            </Link>
          </div>

          <div className='text-center my-4 px-5'>
            <Link to='/SignUp/Company' className='btn'>
              Sign up as a company
            </Link>
          </div>
          <br></br>
          <hr></hr>
          <br></br>
          <div>
            <h3 className='h3'>Already a member?</h3>
            <p className='p-1'>
              Login <Link to='/login'>here</Link>
            </p>
          </div>
          <br></br>
        </form>
      </div>
    );
  }
}
