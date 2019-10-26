import React, { Component } from 'react';
import UserInfo from './Components/Company/UserInfo';
import UserFeed from './Components/Company/UserFeed/UserFeed';
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
          gender: 'Male',
          specialties: ['Web Developer', 'PHP Developer', 'Larvel Developer'],
          socialStatus: 'Engaged',
          education: {
            school: 'Al Al-Bait University',
            field: 'Computer Science',
            gpa: 'Excellent'
          },
          location: 'Amman',
          imgsrc: profileImg
        },
        {
          id: 2,
          name: 'Mohammad Khaled',
          gender: 'Male',
          specialties: ['Web Developer'],
          socialStatus: 'Single',
          education: {
            school: 'Al-Balqa Applied University',
            field: 'Software Engineering',
            gpa: 'Very Good'
          },

          location: 'Amman',
          imgsrc: profileImg
        },
        {
          id: 3,
          name: 'Mohammad Khaled',
          gender: 'Male',
          specialties: ['Web Developer'],
          socialStatus: 'Single',
          education: {
            school: ' Al-Hussein Bin Talal University',
            field: ' Computer Information Systems',
            gpa: 'Good'
          },

          location: 'Amman',
          imgsrc: profileImg
        },
        {
          id: 4,
          name: 'Mohammad Khaled',
          gender: 'Male',
          specialties: ['Web Developer'],
          socialStatus: 'Single',
          education: {
            school: 'Hashemite University',
            field: 'Business Information Technology',
            gpa: 'Good'
          },

          location: 'Amman',
          imgsrc: profileImg
        },
        {
          id: 1,
          name: 'Mohammad Khaled',
          gender: 'Male',
          specialties: ['Web Developer', 'PHP Developer', 'Larvel Developer'],
          socialStatus: 'Engaged',
          education: {
            school: 'Al Al-Bait University',
            field: 'Computer Science',
            gpa: 'Excellent'
          },
          location: 'Amman',
          imgsrc: profileImg
        },
        {
          id: 2,
          name: 'Mohammad Khaled',
          gender: 'Male',
          specialties: ['Web Developer'],
          socialStatus: 'Single',
          education: {
            school: 'Al-Balqa Applied University',
            field: 'Software Engineering',
            gpa: 'Very Good'
          },

          location: 'Amman',
          imgsrc: profileImg
        },
        {
          id: 3,
          name: 'Mohammad Khaled',
          gender: 'Male',
          specialties: ['Web Developer'],
          socialStatus: 'Single',
          education: {
            school: ' Al-Hussein Bin Talal University',
            field: ' Computer Information Systems',
            gpa: 'Good'
          },

          location: 'Amman',
          imgsrc: profileImg
        },
        {
          id: 4,
          name: 'Mohammad Khaled',
          gender: 'Male',
          specialties: ['Web Developer'],
          socialStatus: 'Single',
          education: {
            school: 'Hashemite University',
            field: 'Business Information Technology',
            gpa: 'Good'
          },

          location: 'Amman',
          imgsrc: profileImg
        }
      ]
    }
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
  getStudentsWhoApplied = postId => {
    //using ajax get from the server to get the students who applied to the postId
  };
  render() {
    return (
      <div className='container'>
        <div className='row mt-3'>
          <div className='col-md-8 '>
            <UserFeed
              studentsApplied={this.state.userFeed.studentsApplied}
              getStudentsWhoApplied={this.getStudentsWhoApplied}
            />
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
