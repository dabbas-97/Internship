import React from 'react';
import { Link } from 'react-router-dom';
export function HomeFirstPart() {
  return (
    <div className=' firstPart'>
      <div className='container '>
        <h1 className='h1-responsive'>Welcome To Internship Platform.</h1>
        <p className='p-3'>
          Internship Platform is a platform that is built to help IT students
          find companies who offer internships opportunities.
        </p>
        <Link to='/signup'>
          <button type='button' className='btn btn-lg'>
            Register now
          </button>
        </Link>
      </div>
    </div>
  );
}
