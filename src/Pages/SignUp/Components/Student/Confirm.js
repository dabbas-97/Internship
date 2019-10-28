import React, { Component } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import firebase, { db } from '../../../../Config/fbConfig'
export class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    const { values } = this.props;
    const { email, password } = values;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
          name: values.name,
          gender: values.sex,
          birthday: `${values.day}/${values.month}/${values.year}`,
          phone: values.phone,
          hometown: values.city,
          bio: values.bio,
          type: 'student'
        })
      }).then(() => this.props.nextStep()).catch(err => console.log(err.message))
  };
  render() {
    const { values } = this.props;
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
              <div className='col-8'>
                <span>{values.email}</span>
              </div>
            </div>
          </li>
          <li className='list-group-item '>
            <div className='row'>
              <div className='col-4'>Password: </div>
              <div className='col-8'>
                <span>{values.password}</span>
              </div>
            </div>
          </li>
          <li className='list-group-item'>
            <div className='row'>
              <div className='col-4'> Name:</div>
              <div className='col-8'>
                <span>{values.name}</span>
              </div>
            </div>
          </li>
          <li className='list-group-item'>
            <div className='row'>
              <div className='col-4'> Gender:</div>
              <div className='col-8'>
                <span>{values.sex}</span>
              </div>
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
              <div className='col-8'>
                <span>{values.phone}</span>
              </div>
            </div>
          </li>
          <li className='list-group-item'>
            <div className='row'>
              <div className='col-4'> Hometown:</div>
              <div className='col-8'>
                <span>{values.city}</span>
              </div>
            </div>
          </li>
          <li className={isBio()}>
            <div className='row'>
              <div className='col-4'> Students Bio: </div>
              <div className='col-8'>
                <span>{values.bio}</span>
              </div>
            </div>
          </li>
        </ul>
        <div className=' form-inline justify-content-center form-row my-1'>
          <div className='text-center m-4 '>
            <button type='button' className='btn' onClick={this.props.prevStep}>
              <IoIosArrowBack /> Back
            </button>
          </div>
          <div className='text-center my-1'>
            <button type='submit' className='btn' onClick={this.continue}>
              Confirm & SignUp
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
