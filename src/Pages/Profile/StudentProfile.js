import React, { Component } from 'react';
import UserInfo from './Components/Student/UserInfo';
import UserFeed from './Components/Student/UserFeed';
import firstCompany from '../../images/firstCompany.jpg';
import secondCompany from '../../images/secondCompany.jpg';
import thirdCompany from '../../images/thirdCompany.jpg';

export default class StudentProfile extends Component {
  state = {
    userInfo: {
      name: 'Khaled Mohammad',
      sex: 'male',
      birthday: '9/AUG/1995',
      date: '2 Months ago',
      bio: 'bio...bio...bio...bio...',
      location: 'Amman'
    },
    userFeed: {
      internshipsApplayed: [
        {
          id: 1,
          name: 'Microsoft',
          job: 'Web Developer',
          status: 'pending',
          imgsrc: firstCompany
        },
        {
          id: 2,
          name: 'Eskadinia',
          job: 'Java Developer',
          status: 'accepted',
          imgsrc: secondCompany
        },
        {
          id: 3,
          name: 'Estarta',
          job: 'Swift Developer',
          status: 'rejected',
          imgsrc: thirdCompany
        }
      ]
    },
    userCV: {}
  };

  render() {
    return (
      <div className='row '>
        <div className='col-md-8 '>
          <UserFeed userFeed={this.state.userFeed.internshipsApplayed} />
        </div>
        <div className='col-md-4'>
          <UserInfo userInfo={this.state.userInfo} />
        </div>
      </div>
    );
  }
}
