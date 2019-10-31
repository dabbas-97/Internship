import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useAuth, db } from '../../../../Auth'

const Confirm = (props) => {

  const { auth } = useAuth();
  const { values } = props;
  const { email, password } = values;

  const next = e => {
    e.preventDefault();

    auth.signup(email, password)
      .then(user => {
        return db.collection('users').doc(user.uid).set({
          companyId: user.uid,
          name: values.name,
          phone: values.phone,
          location: values.city,
          bio: values.bio,
          joined: new Date(),
          type: 'company'
        })

      }).then(() => props.nextStep()).catch(err => console.log(err))

  };


  const isBio = () => {
    if (values.bio === '') return 'd-none';
    else return 'list-group-item';
  };

  return (
    <React.Fragment>
      <ul className='list-group text-center'>
        <li className='list-group-item '>
          Email: <span>{values.email}</span>
        </li>
        <li className='list-group-item'>
          Password: <span>{values.password}</span>
        </li>
        <li className='list-group-item'>
          Name: <span>{values.name}</span>
        </li>
        <li className='list-group-item'>
          Phone Number: <span>{values.phone}</span>
        </li>
        <li className='list-group-item'>
          Location: <span>{values.city}</span>
        </li>
        <li className='list-group-item'>
          Phone Number: <span>{values.phone}</span>
        </li>
        <li className={isBio()}>
          Company's Description: <span>{values.bio}</span>
        </li>
      </ul>
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