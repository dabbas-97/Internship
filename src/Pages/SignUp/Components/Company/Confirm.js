import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useAuth, db, toto } from '../../../../Auth'

const Confirm = (props) => {

  const { auth } = useAuth();
  const { values } = props;
  const { email, password } = values;
  const [error, setError] = useState(null);
  const next = e => {
    e.preventDefault();

    auth.signup(email, password)
      .then(user => {
        toto.currentUser.updateProfile({
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/internship-platform-11678.appspot.com/o/profileImages%2Fcompany.png?alt=media&token=80378acd-cb5d-4a02-989c-e1d57e5ef5bf',
          displayName: values.name
        })
        return db.collection('users').doc(user.uid).set({
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/internship-platform-11678.appspot.com/o/profileImages%2Fcompany.png?alt=media&token=80378acd-cb5d-4a02-989c-e1d57e5ef5bf',
          companyId: user.uid,
          name: values.name,
          phone: values.phone,
          location: values.city,
          bio: values.bio,
          joined: new Date(),
          type: 'company'
        })

      })
      .catch(err => setError(err.message))

  };
  const errorMessage = () => {
    if (error) {
      return (
        <div className='invalid-feedback text-center my-3'>{error}</div>
      )
    }
  }

  const isBio = () => {
    if (values.bio === '') return 'd-none';
    else return 'list-group-item';
  };

  return (
    <React.Fragment>
      <ul className='list-group text-center'>
        <li className='list-group-item '>
          <div className='row'>
            <div className='col-4'>Email:</div>
            <div className='col-8'> <span>{values.email}</span></div>
          </div>
        </li>

        <li className='list-group-item'>
          <div className='row'>
            <div className='col-4'> Password:</div>
            <div className='col-8'> <span>{values.password}</span></div>
          </div>
        </li>

        <li className='list-group-item'>
          <div className='row'>
            <div className='col-4'> Name:</div>
            <div className='col-8'><span>{values.name}</span></div>
          </div>
        </li>

        <li className='list-group-item'>
          <div className='row'>
            <div className='col-4'> Phone Number: </div>
            <div className='col-8'><span>{values.phone}</span></div>
          </div>
        </li>

        <li className='list-group-item'>
          <div className='row'>
            <div className='col-4'>  Location:</div>
            <div className='col-8'> <span>{values.city}</span></div>
          </div>
        </li>

        <li className={isBio()}>
          <div className='row'>
            <div className='col-4'> Company's Description: </div>
            <div className='col-8'> <span>{values.bio}</span></div>
          </div>
        </li>

      </ul>
      {errorMessage()}
      <div className=' form-inline justify-content-center form-row my-1'>
        <div className='text-center m-4 '>
          <button type='button' className='btn' onClick={props.prevStep}>
            <IoIosArrowBack /> Back
            </button>
        </div>
        <div className='text-center my-1'>
          <button type='submit' className='btn' onClick={next}>
            Confirm & SignUp
            </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Confirm