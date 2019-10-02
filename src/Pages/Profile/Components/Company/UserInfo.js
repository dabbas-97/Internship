import React, { Component } from 'react';
import profileImg from '../../../../images/profile.png';
import { FaUserTie, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { MdAssignmentInd, MdLocationOn } from 'react-icons/md';

export default class UserInfo extends Component {
  render() {
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
              <FaUserTie />
            </span>
            {this.props.userInfo.name}
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
