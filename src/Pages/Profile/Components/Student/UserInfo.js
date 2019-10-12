import React, { Component } from 'react';
import profileImg from '../../../../images/education.png';
import { IoMdMale, IoMdFemale } from 'react-icons/io';
import {
  FaBirthdayCake,
  FaUserGraduate,
  FaQuoteLeft,
  FaQuoteRight,
  FaPen
} from 'react-icons/fa';
import { MdAssignmentInd, MdLocationOn, MdPhone } from 'react-icons/md';
import { Birthday } from '../../../SignUp/Components/Student/Birthday';

export default class UserInfo extends Component {
  state = {
    info: 'view',
    newName: '',
    newSex: '',
    day: '',
    month: '',
    year: '',
    newLocation: '',
    newPhone: '',
    newBio: ''
  };
  render() {
    let { userInfo } = this.props;
    //icons for gender
    const genderIcon = () => {
      if (this.props.userInfo.sex === 'male') return <IoMdMale />;
      else if (this.props.userInfo.sex === 'female') return <IoMdFemale />;
    };
    const changeView = () => {
      this.setState({ info: 'edit' });
    };
    const handleChange = input => e => {
      this.setState({ [input]: e.target.value });
    };
    const renderName = () => {
      if (this.state.info === 'view') return this.props.userInfo.name;
      else
        return (
          <input
            type='text'
            className=''
            placeholder='Your Name'
            onChange={handleChange('newName')}
            defaultValue={this.props.userInfo.name}
          />
        );
    };
    const renderSex = () => {
      if (this.state.info === 'view') return this.props.userInfo.sex;
      else
        return (
          <select
            name='sex'
            className=''
            onChange={handleChange('newSex')}
            value={this.props.userInfo.sex}
          >
            <option value='female'>Female</option>
            <option value='male'>Male</option>
          </select>
        );
    };
    const renderBday = () => {
      const values = {
        day: this.props.userInfo.day,
        month: this.props.userInfo.month,
        year: this.props.userInfo.year
      };
      if (this.state.info === 'view')
        return `${values.day}/${values.month}/${values.year}`;
      else return <Birthday handleChange={handleChange} values={values} />;
    };
    const renderLocation = () => {
      if (this.state.info === 'view') return this.props.userInfo.location;
      else
        return (
          <input
            type='text'
            className=''
            placeholder='Location'
            onChange={handleChange('newLocation')}
            defaultValue={this.props.userInfo.location}
          />
        );
    };
    const renderPhone = () => {
      if (this.state.info === 'view') return this.props.userInfo.phone;
      else
        return (
          <input
            type='text'
            className=''
            placeholder='Phone Number'
            onChange={handleChange('newPhone')}
            defaultValue={this.props.userInfo.phone}
          />
        );
    };
    const renderBio = () => {
      if (this.state.info === 'view') return this.props.userInfo.bio;
      else
        return (
          <textarea
            className=' form-control'
            onChange={handleChange('newBio')}
            defaultValue={this.props.userInfo.bio}
            placeholder='Bio'
          />
        );
    };
    const renderButton = () => {
      if (this.state.info === 'edit')
        return (
          <button
            type='button'
            className='btn editInfoBtn'
            onClick={submitChanges}
          >
            <span className=''>
              <FaPen />
            </span>
            Submit Changes
          </button>
        );
    };
    const submitChanges = () => {
      this.setState({ info: 'view' });
    };

    return (
      <div className=' profileInfo'>
        <span className='editSpan' onClick={changeView}>
          <FaPen />
        </span>

        <img
          src={profileImg}
          className='proImg rounded-circle'
          alt='profile '
        />
        <ul className='list-group list-group-flush text-center'>
          {/* name of the user */}
          <li className='list-group-item edit'>
            <span>
              <FaUserGraduate />
            </span>
            {renderName()}
          </li>
          {/* users gender */}
          <li className='list-group-item edit'>
            <span>{genderIcon()}</span>
            {renderSex()}
          </li>
          {/* users birthday */}
          <li className='list-group-item edit'>
            <span>
              <FaBirthdayCake />
            </span>
            {renderBday()}
          </li>
          {/* users location */}
          <li className='list-group-item edit'>
            <span>
              <MdLocationOn />
            </span>
            {renderLocation()}
          </li>
          {/* user phone number */}
          <li className='list-group-item edit'>
            <span>
              <MdPhone />
            </span>
            {renderPhone()}
          </li>
          {/* users bio */}
          <li className='list-group-item edit'>
            <span>
              <FaQuoteLeft />
            </span>
            {renderBio()}
            <span>
              <FaQuoteRight />
            </span>
          </li>
          {/* date added */}
          <li className='list-group-item'>
            <span>
              <MdAssignmentInd />
            </span>
            {this.props.userInfo.date}
          </li>
        </ul>
        {renderButton()}
      </div>
    );
  }
}
