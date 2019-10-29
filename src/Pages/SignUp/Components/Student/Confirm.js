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
          name: values.name,
          gender: values.sex,
          birthday: `${values.day}/${values.month}/${values.year}`,
          phone: values.phone,
          hometown: values.city,
          bio: values.bio,
          type: 'student'
        })
      }).then(() => props.nextStep()).catch(err => console.log(err.message))
  };
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