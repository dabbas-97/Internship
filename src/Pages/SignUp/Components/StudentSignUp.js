import React, { Component } from 'react';
import '../SignUp.css';
import { Link, Redirect } from 'react-router-dom';
import { UserInfo } from './UserInfo';
import { StudentInfo } from './Student/StudentInfo';
import { Confirm } from './Student/Confirm';
import logoImg from '../../../images/logo.PNG';

export default class StudentSignUp extends Component {
  state = {
    step: 1,
    name: '',
    email: '',
    sex: 'female',
    day: '1',
    month: 'January',
    year: '2019',
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

  formReturner() {
    const { step } = this.state;
    const {
      name,
      email,
      password,
      phone,
      city,
      bio,
      passmatch,
      year,
      day,
      month,
      sex
    } = this.state;
    const values = {
      name,
      email,
      password,
      phone,
      city,
      bio,
      passmatch,
      year,
      day,
      month,
      sex
    };
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
          <StudentInfo
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
    return (
      <div className='container '>
        <form className=' formLog '>
          <img src={logoImg} className='logo' alt='' />
          <h1 className='h-6 text-center '>Students Signup</h1>
          <br></br>
          <hr></hr>
          {this.formReturner()}
          <hr></hr>
          <br></br>
          <div>
            <h3 className='h3'>Signup as a company</h3>
            <p className='p-1'>
              From <Link to='/SignUp/Company'>here</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

class Success extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className='h1 text-center m-lg-5'>Success!</h1>
      </React.Fragment>
    );
  }
}
