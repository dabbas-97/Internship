import React, { Component } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { Birthday } from './Birthday';
export class StudentInfo extends Component {
  state = {
    validPhone: false,
    validCity: false,
    validName: false,
    validPhoneClass: 'form-control',
    validCityClass: 'form-control',
    validNameClass: 'form-control mt-2'
  };
  render() {
    const { name, phone, city, bio } = this.props.values;
    const nextValidate = () => {
      let { validPhone, validCity, validName } = this.state;
      if (validPhone && validCity && validName) this.props.nextStep();
    };

    //City Matching
    const isValidCity = isIt => {
      if (isIt) {
        this.setState({ validCity: true });
        this.setState({ validCityClass: 'form-control is-valid' });
      } else {
        this.setState({ validCity: false });
        this.setState({ validCityClass: 'form-control is-invalid' });
      }
    };
    const validateCity = e => {
      this.props.handleChange('city')(e);
      if (e.target.value !== '') {
        isValidCity(true);
      } else {
        isValidCity(false);
      }
    };

    //Phone validation
    const isValidPhone = isIt => {
      if (isIt) {
        this.setState({ validPhone: true });
        this.setState({ validPhoneClass: 'form-control is-valid' });
      } else {
        this.setState({ validPhone: false });
        this.setState({ validPhoneClass: 'form-control is-invalid' });
      }
    };
    const validatePhone = e => {
      this.props.handleChange('phone')(e);
      let re = /(^(07)[0-9]{8}$)|(^((06)|(05))[0-9]{7}$)/;
      if (re.test(e.target.value)) {
        isValidPhone(true);
      } else {
        isValidPhone(false);
      }
    };

    //Name validation
    const isValidName = isIt => {
      if (isIt) {
        this.setState({ validName: true });
        this.setState({ validNameClass: 'form-control is-valid' });
      } else {
        this.setState({ validName: false });
        this.setState({ validNameClass: 'form-control is-invalid' });
      }
    };
    const validateName = e => {
      this.props.handleChange('name')(e);
      let re = /^[A-Za-z]{2,}\s?[A-Za-z]{2,}$/;
      if (e.target.value !== '' && re.test(String(e.target.value))) {
        isValidName(true);
      } else {
        isValidName(false);
      }
    };

    return (
      <React.Fragment>
        <div className='form-group my-1 '>
          <label htmlFor='studentname'>Your Full Name</label>
          <input
            type='text'
            className={this.state.validNameClass}
            placeholder='Mohammad Ahmad'
            onChange={validateName}
            defaultValue={name}
          />
        </div>
        <hr></hr>
        <div className='row'>
          <div
            className='form-check  form-group my-1 col-4'
            onChange={this.props.handleChange('sex')}
          >
            <label className='form-check-label mr-1'>
              <input
                className=''
                type='radio'
                name='gender'
                value='female'
                defaultChecked
                checked={this.props.values.sex === 'female'}
              />
              Female
            </label>

            <label className='form-check-label mx-1'>
              <input
                className=''
                type='radio'
                name='gender'
                value='male'
                checked={this.props.values.sex === 'male'}
              />
              Male
            </label>
          </div>

          <div className='form-group my-1 col-8 '>
            <label className='mr-1'>Birthday: </label>
            <Birthday
              handleChange={this.props.handleChange}
              values={this.props.values}
            />
          </div>
        </div>
        <hr />
        <div className='form-group my-1 '>
          <label htmlFor='phonenumber'>Phone Number</label>
          <input
            type='tel'
            className={this.state.validPhoneClass}
            placeholder='07XXXXXXXX'
            maxLength='10'
            onChange={validatePhone}
            defaultValue={phone}
          />
        </div>
        <div className='form-group my-1 '>
          <label>Hometown</label>
          <input
            className={this.state.validCityClass}
            onChange={validateCity}
            defaultValue={city}
            placeholder='Amman\Jordan st.'
          />
        </div>
        <div className='form-group my-1 '>
          <label>Student's Bio (optional)</label>
          <textarea
            className=' form-control'
            onChange={this.props.handleChange('bio')}
            defaultValue={bio}
            placeholder='Bio'
          />
        </div>

        <div className=' form-inline justify-content-center form-row my-1'>
          <div className='text-center m-4 '>
            <button type='button' className='btn' onClick={this.props.prevStep}>
              <IoIosArrowBack /> Back
            </button>
          </div>
          <div className='text-center m-4 '>
            <button type='button' className='btn' onClick={nextValidate}>
              Next <IoIosArrowForward />
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
