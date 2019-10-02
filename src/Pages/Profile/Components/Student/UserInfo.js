import React, { Component } from 'react';
import profileImg from '../../../../images/education.png';
import { IoMdMale, IoMdFemale } from 'react-icons/io';
import {
  FaBirthdayCake,
  FaUserGraduate,
  FaQuoteLeft,
  FaQuoteRight
} from 'react-icons/fa';
import { MdAssignmentInd, MdLocationOn } from 'react-icons/md';

export default class UserInfo extends Component {
  render() {
    //icons for gender
    const genderIcon = () => {
      if (this.props.userInfo.sex === 'male') return <IoMdMale />;
      else if (this.props.userInfo.sex === 'female') return <IoMdFemale />;
    };

    return (
      <div className=' profileInfo'>
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
            {this.props.userInfo.name}
          </li>
          {/* users gender */}
          <li className='list-group-item edit'>
            <span>{genderIcon()}</span>
            {this.props.userInfo.sex}
          </li>
          {/* users birthday */}
          <li className='list-group-item edit'>
            <span>
              <FaBirthdayCake />
            </span>
            {this.props.userInfo.birthday}
          </li>
          {/* users location */}
          <li className='list-group-item edit'>
            <span>
              <MdLocationOn />
            </span>
            {this.props.userInfo.location}
          </li>
          {/* users bio */}
          <li className='list-group-item edit'>
            <span>
              <FaQuoteLeft />
            </span>
            {this.props.userInfo.bio}
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
      </div>
    );
  }
}
