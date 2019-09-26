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
        <form onSubmit={this.signupSubmit}>
          <h1 className='h-1 text-center'>Sign Up As a Student</h1>
        </form>
      </div>
    );
  }
}
