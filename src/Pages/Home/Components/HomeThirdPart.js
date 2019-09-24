import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosChatboxes } from 'react-icons/io';

export function HomeThirdPart() {
  return (
    <div className='thirdPart'>
      <div className='container'>
        <h3 className='h3-responsive'>Chat Rooms!</h3>
        <p className='p-lg-2'>
          You can now chat with other users of the platform.
        </p>
        <Link to='/chat'>
          <button type='button' className='btn btn-lg'>
            Chat Now <IoIosChatboxes color='white' />
          </button>
        </Link>
      </div>
    </div>
  );
}
