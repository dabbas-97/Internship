import React, { Component } from 'react';
import UserInfo from './Components/Company/UserInfo';
import UserFeed from './Components/Company/UserFeed';
import profileImg from '../../images/education.png';

export default class CompanyProfile extends Component {
  state = {
    userInfo: {
      name: 'Microsoft',
      date: '2 Months ago',
      bio: 'bio...bio...bio...bio...',
      phone: '0798523697',
      location: 'Jarash',
      userImg: profileImg
    },
    userFeed: {
      studentsApplied: [
        {
          id: 1,
          name: 'Mohammad Khaled',
          gender: 'male',
          job: 'Web Developer',
          status: 'pending',
          imgsrc: profileImg
        },
        {
          id: 2,
          name: '2',
          job: 'Java Developer',
          status: 'accepted',
          imgsrc: profileImg
        },
        {
          id: 3,
          name: '3',
          job: 'Swift Developer',
          status: 'rejected',
          imgsrc: profileImg
        },
        {
          id: 4,
          name: '4',
          job: '.NET Developer',
          status: 'pending',
          imgsrc: profileImg
        },
        {
          id: 5,
          name: '5',
          job: 'Javascript Developer',
          status: 'accepted',
          imgsrc: profileImg
        },
        {
          id: 6,
          name: '6',
          job: 'Larvel Developer',
          status: 'rejected',
          imgsrc: profileImg
        }
      ]
    },
    userCV: {}
  };
  handleChange = input => e => {
    var userInfo = { ...this.state.userInfo };
    userInfo[input] = e.target.value;
    this.setState({ userInfo });
  };
  handleChangeImg = src => {
    var userInfo = { ...this.state.userInfo };
    userInfo.userImg = src;
    this.setState({ userInfo });
  };
  render() {
    return (
      <div className='container'>
        <div className='row '>
          <div className='col-md-8 '>
            <UserFeed studentsApplied={this.state.userFeed.studentsApplied} />
          </div>
          <div className='col-md-4'>
            <UserInfo
              userInfo={this.state.userInfo}
              handleChange={this.handleChange}
              handleChangeImg={this.handleChangeImg}
            />
          </div>
        </div>
      </div>
    );
  }
}
