import React, { Component } from 'react';
import '../SignUp.css';
import { Link, Redirect } from 'react-router-dom';
import { UserInfo } from './UserInfo';
import { CompanyInfo } from './Company/CompanyInfo';

export default class CompanySignUp extends Component {
  signupSubmit = e => {
    e.preventDefault();
  };
  state = {
    step: 1,
    name: '',
    email: '',
    password: '',
    passmatch: '',
    phone: '',
    city: '',
    bio: ''
  };
  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };
  getPassmatch = () => this.state.passmatch;
  formReturner() {
    const { step } = this.state;
    const { name, email, password, phone, city, bio } = this.state;
    const values = { name, email, password, phone, city, bio };
    switch (step) {
      case 1:
        return (
          <UserInfo
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            prevStep={this.prevStep}
            getPassmatch={this.getPassmatch}
          />
        );
      case 2:
        return (
          <CompanyInfo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return <Success />;
      default:
        return <Redirect to='/signup' />;
    }
  }

  render() {
    if (this.state.finished === true) {
    } else {
      return (
        <div className='container '>
          <form onSubmit={this.signupSubmit}>
            <h1 className='h-6 text-center'>Company Signup</h1>
            <br></br>
            <hr></hr>
            {this.formReturner()}
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
}

class Success extends Component {
  render() {
    return <React.Fragment></React.Fragment>;
  }
}
class Confirm extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='text-center my-4'>
          <button type='submit' className='btn'>
            Confirm & SignUp
          </button>
        </div>
      </React.Fragment>
    );
  }
}
