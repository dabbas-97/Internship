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
            <div className='row'>
              <div className='col-4'>Email:</div>
              <div className='col-8'>
                <span>{this.props.values.email}</span>
              </div>
            </div>
          </li>
          <li className='list-group-item '>
            <div className='row'>
              <div className='col-4'>Password: </div>
              <div className='col-8'>
                <span>{this.props.values.password}</span>
              </div>
            </div>
          </li>
          <li className='list-group-item'>
            <div className='row'>
              <div className='col-4'> Name:</div>
              <div className='col-8'>
                <span>{this.props.values.name}</span>
              </div>
            </div>
          </li>
          <li className='list-group-item'>
            <div className='row'>
              <div className='col-4'> Gender:</div>
              <div className='col-8'>
                <span>{this.props.values.sex}</span>
              </div>
            </div>
          </li>
          <li className='list-group-item'>
            <div className='row'>
              <div className='col-4'> Birthday:</div>
              <div className='col-8'>
                <span>{this.props.values.day}</span>/
                <span>{this.props.values.month}</span>/
                <span>{this.props.values.year}</span>
              </div>
            </div>
          </li>
          <li className='list-group-item'>
            <div className='row'>
              <div className='col-4'> Phone Number:</div>
              <div className='col-8'>
                <span>{this.props.values.phone}</span>
              </div>
            </div>
          </li>
          <li className='list-group-item'>
            <div className='row'>
              <div className='col-4'> Location:</div>
              <div className='col-8'>
                <span>{this.props.values.city}</span>
              </div>
            </div>
          </li>
          <li className={isBio()}>
            <div className='row'>
              <div className='col-4'> Students Bio: </div>
              <div className='col-8'>
                <span>{this.props.values.bio}</span>
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
