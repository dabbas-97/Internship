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
    info: 'view'
  };
  render() {
    const { userInfo } = this.props;
    //icons for gender
    const genderIcon = () => {
      if (userInfo.sex === 'male') return <IoMdMale />;
      else if (userInfo.sex === 'female') return <IoMdFemale />;
    };
    const changeView = () => {
      this.setState({ info: 'edit' });
    };
    const handleChange = input => e => {
      userInfo[input] = e.target.value;
    };
    const renderName = () => {
      if (this.state.info === 'view') return userInfo.name;
      else
        return (
          <input
            type='text'
            className=''
            placeholder='Your Name'
            onChange={handleChange('name')}
            defaultValue={userInfo.name}
          />
        );
    };
    const renderSex = () => {
      if (this.state.info === 'view') return userInfo.sex;
      else
        return (
          <select
            name='sex'
            className=''
            onChange={handleChange('sex')}
            value={userInfo.sex}
          >
            <option value='female'>Female</option>
            <option value='male'>Male</option>
          </select>
        );
    };
    const renderBday = () => {
      if (this.state.info === 'view')
        return `${userInfo.day}/${userInfo.month}/${userInfo.year}`;
      else return <Birthday handleChange={handleChange} values={userInfo} />;
    };
    const renderLocation = () => {
      if (this.state.info === 'view') return userInfo.location;
      else
        return (
          <input
            type='text'
            className=''
            placeholder='Location'
            onChange={handleChange('location')}
            defaultValue={userInfo.location}
          />
        );
    };
    const renderPhone = () => {
      if (this.state.info === 'view') return userInfo.phone;
      else
        return (
          <input
            type='text'
            className=''
            placeholder='Phone Number'
            onChange={handleChange('phone')}
            defaultValue={userInfo.phone}
          />
        );
    };
    const renderBio = () => {
      if (this.state.info === 'view') return userInfo.bio;
      else
        return (
          <textarea
            className=' form-control'
            onChange={handleChange('bio')}
            defaultValue={userInfo.bio}
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
      // send new values to the data
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
            {userInfo.date}
          </li>
        </ul>
        {renderButton()}
      </div>
    );
  }
}
