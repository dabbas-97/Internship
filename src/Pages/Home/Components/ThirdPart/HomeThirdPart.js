import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosChatboxes } from 'react-icons/io';

export function HomeThirdPart() {
  return (
    <div className='thirdPart'>
      <div className='container' style={{ height: '100%' }}>
        <div className=' Home'>
          <div className='row'>
            <div className='col'>
              <h3 className='h3-responsive'>Chat Rooms!</h3>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <p className='p-lg-2'>
                You can now chat with other users.
            </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 offset-md-8'>
              <Link to='/chat'>
                <button type='button' className='btn btn-lg'>
                  Chat Now <IoIosChatboxes color='white' />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
