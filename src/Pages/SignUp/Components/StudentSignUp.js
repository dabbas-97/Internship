import React, { useState } from 'react';
import '../SignUp.css';
import { Link, Redirect } from 'react-router-dom';
import { UserInfo } from './UserInfo';
import { StudentInfo } from './Student/StudentInfo';
import Confirm from './Student/Confirm';
import logoImg from '../../../images/logo.PNG';
import Success from './Success';
import { useAuth } from '../../../Auth'
const StudentSignUp = () => {
  const [userInfo, setUserInfo] = useState({
    step: 1, name: '', email: '', sex: 'Female', day: '1', month: 'JAN', year: '1999', password: '', passmatch: '', phone: '', city: '', bio: ''
  });
  const { auth } = useAuth();

  if (auth.user) {
    return <Redirect to='/' />
  }

  // Proceed to next step
  const nextStep = () => {
    setUserInfo({
      ...userInfo,
      step: userInfo.step + 1
    });
  };

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
    const { name, email, password, phone, city, bio, passmatch, year, day, month, sex } = userInfo;
    const values = { name, email, password, phone, city, bio, passmatch, year, day, month, sex };
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
          <StudentInfo
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
        return <Redirect to='/' />;
    }
  }

  return (
    <div className='container '>
      <form className=' formLog '>
        <img src={logoImg} className='logo' alt='' />
        <h1 className='h-6 text-center '>Students Signup</h1>
        <br></br>
        <hr></hr>
        {formReturner()}
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


export default StudentSignUp;