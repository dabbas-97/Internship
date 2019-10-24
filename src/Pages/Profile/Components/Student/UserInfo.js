import React, { Component } from 'react';
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
import InputFiles from 'react-input-files';

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
                <FaUserGraduate />
              </span>
              {userInfo.name}
            </li>
            {/* users gender */}
            <li className='list-group-item edit'>
              <span>{genderIcon()}</span>
              {userInfo.sex}
            </li>
            {/* users birthday */}
            <li className='list-group-item edit'>
              <span>
                <FaBirthdayCake />
              </span>
              {this.props.userInfo.day}/{this.props.userInfo.month}/{this.props.userInfo.year}
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
              <FaUserGraduate />
            </span>
            <input
              type='text'
              className=''
              placeholder='Your Name'
              onChange={this.props.handleChange('name')}
              defaultValue={userInfo.name} required
            />
          </li>
          {/* users gender */}
          <li className='list-group-item '>
            <span>{genderIcon()}</span>
            <select
              name='sex'
              className=''
              onChange={this.props.handleChange('sex')}
              value={userInfo.sex}
            >
              <option value='female'>Female</option>
              <option value='male'>Male</option>
            </select>
          </li>
          {/* users birthday */}
          <li className='list-group-item '>
            <span>
              <FaBirthdayCake />
            </span>
            <Birthday
              handleChange={this.props.handleChange}
              values={this.props.userInfo}
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
