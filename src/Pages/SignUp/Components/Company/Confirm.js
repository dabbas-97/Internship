import React, { Component } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
export class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };
  render() {
    const isBio = () => {
      if (this.props.values.bio === '') return 'd-none';
      else return 'list-group-item';
    };
    return (
      <React.Fragment>
        <ul className='list-group text-center'>
          <li className='list-group-item '>
            Email: <span>{this.props.values.email}</span>
          </li>
          <li className='list-group-item'>
            Password: <span>{this.props.values.password}</span>
          </li>
          <li className='list-group-item'>
            Name: <span>{this.props.values.name}</span>
          </li>
          <li className='list-group-item'>
            Phone Number: <span>{this.props.values.phone}</span>
          </li>
          <li className='list-group-item'>
            Location: <span>{this.props.values.city}</span>
          </li>
          <li className='list-group-item'>
            Phone Number: <span>{this.props.values.phone}</span>
          </li>
          <li className={isBio()}>
            Company's Description: <span>{this.props.values.bio}</span>
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
