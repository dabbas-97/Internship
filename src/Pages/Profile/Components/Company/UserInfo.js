import React, { Component } from 'react';

import { FaUserTie, FaQuoteLeft, FaQuoteRight, FaPen } from 'react-icons/fa';
import { MdAssignmentInd, MdLocationOn, MdPhone } from 'react-icons/md';

import InputFiles from 'react-input-files';

export default class UserInfo extends Component {
  state = {
    info: 'view'
  };
  render() {
    const { userInfo } = this.props;

    const changeView = () => {
      this.setState({ info: 'edit' });
    };

    const renderName = () => {
      if (this.state.info === 'view') return userInfo.name;
      else
        return (
          <input
            type='text'
            className=''
            placeholder='Your Name'
            onChange={this.props.handleChange('name')}
            defaultValue={userInfo.name}
          />
        );
    };

    const renderLocation = () => {
      if (this.state.info === 'view') return userInfo.location;
      else
        return (
          <input
            type='text'
            className=''
            placeholder='Location'
            onChange={this.props.handleChange('location')}
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
            onChange={this.props.handleChange('phone')}
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
            onChange={this.props.handleChange('bio')}
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
    const imageUpload = file => {
      if (file.length > 0) {
        let src = URL.createObjectURL(file[0]);
        this.props.handleChangeImg(src);
      }
    };

    return (
      <div className=' profileInfo'>
        <span className='editSpan' onClick={changeView}>
          <FaPen />
        </span>

        <div className='profileImg'>
          <InputFiles onChange={imageUpload} style={{ outline: 'none' }}>
            <img
              src={this.props.userInfo.userImg}
              className='proImg rounded-circle'
              alt='profile '
            />
          </InputFiles>
        </div>

        <ul className='list-group list-group-flush text-center'>
          {/* name of the user */}
          <li className='list-group-item edit'>
            <span>
              <FaUserTie />
            </span>
            {renderName()}
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
