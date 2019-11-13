import React, { useState } from 'react';
import '../SignUp.css';
import { Link, Redirect } from 'react-router-dom';
import { UserInfo } from './UserInfo';
import { CompanyInfo } from './Company/CompanyInfo';
import Confirm from './Company/Confirm';
import logoImg from '../../../images/logo.PNG';
import Success from './Success';
import { useAuth } from '../../../Auth'

const CompanySignUp = () => {
  const { auth } = useAuth();

  const [userInfo, setUserInfo] = useState({ step: 1, name: '', email: '', password: '', passmatch: '', phone: '', city: '', bio: '' });

  // Proceed to next step
  const nextStep = () => {
    setUserInfo({
      ...userInfo,
      step: userInfo.step + 1
    });
  };
  if (auth.user) {
    return <Redirect to='/' />
  }

  // Go back to prev step
  const prevStep = () => {
    setUserInfo({
      ...userInfo,
      step: userInfo.step - 1
    });
  };

  // Handle fields change
  const handleChange = input => e => {
    setUserInfo({ ...userInfo, [input]: e.target.value });
  };

  const formReturner = () => {
    const { step } = userInfo;
    const { name, email, password, phone, city, bio, passmatch } = userInfo;
    const values = { name, email, password, phone, city, bio, passmatch };
    switch (step) {
      case 1:
        return (
          <UserInfo
            nextStep={nextStep}
            handleChange={handleChange}
            values={values}
            prevStep={prevStep}
          />
        );
      case 2:
        return (
          <CompanyInfo
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
          />
        );
      case 4:
        return <Success />;
      default:
        return <Redirect to='/SignUp' />;
    }
  }


  return (
    <div className='container '>
      <form className='formLog'>
        <img src={logoImg} className='logo' alt='' />
        <h1 className='h-6 text-center'>Company Signup</h1>
        <br></br>
        <hr></hr>
        {formReturner()}
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

export default CompanySignUp