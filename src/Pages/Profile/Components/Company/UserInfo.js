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
    //icons for gender

    const changeView = () => {
      this.setState({ info: 'edit' });
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
    const userInfoPage = () => {
      if (this.state.info === 'view') return (
        <React.Fragment>
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
              {userInfo.name}
            </li>
            {/* users location */}
            <li className='list-group-item edit'>
              <span>
                <MdLocationOn />
              </span>
              {userInfo.location}
            </li>
            {/* user phone number */}
            <li className='list-group-item edit'>
              <span>
                <MdPhone />
              </span>
              {userInfo.phone}
            </li>
            {/* users bio */}
            <li className='list-group-item edit'>
              <span>
                <FaQuoteLeft />
              </span>
              {userInfo.bio}
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
        </React.Fragment>
      ); else return (<form onSubmit={submitChanges}>
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
          <li className='list-group-item '>
            <span>
              <FaUserTie />
            </span>
            <input
              type='text'
              className=''
              placeholder='Your Name'
              onChange={this.props.handleChange('name')}
              defaultValue={userInfo.name} required
            />
          </li>
          {/* users location */}
          <li className='list-group-item '>
            <span>
              <MdLocationOn />
            </span>
            <input
              type='text'
              className=''
              placeholder='Location'
              onChange={this.props.handleChange('location')}
              defaultValue={userInfo.location} required
            />
          </li>
          {/* user phone number */}
          <li className='list-group-item '>
            <span>
              <MdPhone />
            </span>
            <input
              type='text'
              className=''
              placeholder='Phone Number'
              onChange={this.props.handleChange('phone')}
              defaultValue={userInfo.phone} required
            />
          </li>
          {/* users bio */}
          <li className='list-group-item '>
            <span>
              <FaQuoteLeft />
            </span>
            <textarea
              className=' form-control'
              onChange={this.props.handleChange('bio')}
              defaultValue={userInfo.bio}
              placeholder='Bio'
            />
            <span>
              <FaQuoteRight />
            </span>
          </li>
        </ul>
        <button
          type='submit'
          className='btn editInfoBtn'
        >
          <span className=''>
            <FaPen />
          </span>
          Submit Changes
          </button>
      </form>)
    }


    return <div className='profileInfo'>{userInfoPage()}</div>
  }
}
