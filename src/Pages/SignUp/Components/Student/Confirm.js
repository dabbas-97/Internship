import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useAuth, db, toto } from '../../../../Auth'

const Confirm = (props) => {

  const { auth } = useAuth();
  const { values } = props;
  const { email, password, sex } = values;
  const [error, setError] = useState(null);

  const next = e => {
    e.preventDefault();
    var img
    if (sex === 'Female') img = 'https://firebasestorage.googleapis.com/v0/b/internship-platform-11678.appspot.com/o/profileImages%2FfemaleStudent.png?alt=media&token=61a4d9af-adce-4498-b933-97dd3eeead9e'
    else if (sex === 'Male') img = 'https://firebasestorage.googleapis.com/v0/b/internship-platform-11678.appspot.com/o/profileImages%2Fstudent.png?alt=media&token=bcf22f46-7263-4c2d-a6dc-010dd6091564'
    auth.signup(email, password)
      .then(user => {
        toto.currentUser.updateProfile({
          photoURL: img,
          displayName: values.name
        })


        return db.collection('users').doc(user.uid).set({
          photoURL: img,
          name: values.name,
          gender: values.sex,
          birthday: `${values.day}/${values.month}/${values.year}`,
          phone: values.phone,
          hometown: values.city,
          bio: values.bio,
          type: 'student',
          joined: new Date(),
        })
      })
      .catch(err => setError(err.message))

  };
  const isBio = () => {
    if (values.bio === '') return 'd-none';
    else return 'list-group-item';
  };
  const errorMessage = () => {
    if (error) {
      return (
        <div className='invalid-feedback text-center my-3'>{error}</div>
      )
    }
  }

  return (
    <React.Fragment>
      <ul className='list-group text-center'>
        <li className='list-group-item '>
          <div className='row'>
            <div className='col-4'>Email:</div>
            <div className='col-8'> <span>{values.email}</span></div>
          </div>
        </li>

        <li className='list-group-item '>
          <div className='row'>
            <div className='col-4'>Password: </div>
            <div className='col-8'> <span>{values.password}</span></div>
          </div>
        </li>

        <li className='list-group-item'>
          <div className='row'>
            <div className='col-4'> Name:</div>
            <div className='col-8'> <span>{values.name}</span> </div>
          </div>
        </li>

        <li className='list-group-item'>
          <div className='row'>
            <div className='col-4'> Gender:</div>
            <div className='col-8'> <span>{values.sex}</span> </div>
          </div>
        </li>

        <li className='list-group-item'>
          <div className='row'>
            <div className='col-4'> Birthday:</div>
            <div className='col-8'>
              <span>{values.day}</span>/
                <span>{values.month}</span>/
                <span>{values.year}</span>
            </div>
          </div>
        </li>

        <li className='list-group-item'>
          <div className='row'>
            <div className='col-4'> Phone Number:</div>
            <div className='col-8'> <span>{values.phone}</span> </div>
          </div>
        </li>

        <li className='list-group-item'>
          <div className='row'>
            <div className='col-4'> Hometown:</div>
            <div className='col-8'> <span>{values.city}</span> </div>
          </div>
        </li>

        <li className={isBio()}>
          <div className='row'>
            <div className='col-4'> Students Bio: </div>
            <div className='col-8'> <span>{values.bio}</span> </div>
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
    </React.Fragment >
  )

}
export default Confirm 