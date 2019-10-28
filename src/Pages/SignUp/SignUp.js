import React, { useContext } from 'react';
import './SignUp.css';
import { Link, withRouter, Redirect } from 'react-router-dom';
import logoImg from '../../images/logo.PNG';
import { AuthContext } from '../../Auth'

const SignUp = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className='container '>
      <form className='Signup-form formLog'>
        <img src={logoImg} className='logo' alt='' />
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

export default withRouter(SignUp);