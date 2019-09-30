import React, { Component } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
export class CompanyInfo extends Component {
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
      let re = /^[A-Za-z]+$/;
      if (e.target.value !== '' && re.test(String(e.target.value))) {
        isValidName(true);
      } else {
        isValidName(false);
      }
    };

    return (
      <React.Fragment>
        <div className='form-group my-4 '>
          <label htmlFor='companyname'>Company Name</label>
          <input
            type='text'
            className={this.state.validNameClass}
            placeholder='Coco Jambos inc.'
            onChange={validateName}
            defaultValue={name}
          />
        </div>
        <div className='form-group my-4 '>
          <label htmlFor='phonenumber'>Phone Number</label>
          <input
            type='tel'
            className={this.state.validPhoneClass}
            placeholder='07XXXXXXXX or 06XXXXXXX'
            maxLength='10'
            onChange={validatePhone}
            defaultValue={phone}
          />
        </div>
        <div className='form-group my-4 '>
          <label>Location</label>
          <input
            className={this.state.validCityClass}
            onChange={validateCity}
            defaultValue={city}
            placeholder='Amman\Jordan street'
          />
        </div>
        <div className='form-group my-4 '>
          <label>Company's Description (optional)</label>
          <textarea
            className=' form-control'
            onChange={this.props.handleChange('bio')}
            defaultValue={bio}
            placeholder="Company's Description"
          />
        </div>

        <div className=' form-inline justify-content-center form-row my-4'>
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
