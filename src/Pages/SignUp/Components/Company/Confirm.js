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
          phone: values.phone,
          location: values.city,
          bio: values.bio,
          type: 'company'
        })

      }).then(() => this.props.nextStep()).catch(err => console.log(err))

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
