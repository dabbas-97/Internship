import React from 'react';
import { Link } from 'react-router-dom';
export function HomeFirstPart() {
  return (
    <div className=' firstPart'>
      <div className='container ' style={{ height: '100%' }}>
        <div className=' Home'>
          <div className='row'>
            <div className='col'>
              <h3 className='h3-responsive'>Welcome To Internship Platform.</h3>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
            <p className='p-lg-2'>
                Internship Platform is a platform that is built to help IT
                students find companies who offer internships opportunities.
            </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 offset-md-8'>
              <Link to='/signup'>
                <button type='button' className='btn btn-lg'>
                  Register now
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
