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
      internshipsApplied: [
        {
          id: 1,
          name: '1',
          job: 'Web Developer',
          status: 'pending',
          imgsrc: firstCompany
        },
        {
          id: 2,
          name: '2',
          job: 'Java Developer',
          status: 'accepted',
          imgsrc: secondCompany
        },
        {
          id: 3,
          name: '3',
          job: 'Swift Developer',
          status: 'rejected',
          imgsrc: thirdCompany
        },
        {
          id: 4,
          name: '4',
          job: '.NET Developer',
          status: 'pending',
          imgsrc: thirdCompany
        },
        {
          id: 5,
          name: '5',
          job: 'Javascript Developer',
          status: 'accepted',
          imgsrc: thirdCompany
        },
        {
          id: 6,
          name: '6',
          job: 'Larvel Developer',
          status: 'rejected',
          imgsrc: thirdCompany
        },
        {
          id: 7,
          name: '7',
          job: 'Web Developer',
          status: 'pending',
          imgsrc: firstCompany
        },
        {
          id: 8,
          name: '8',
          job: 'Java Developer',
          status: 'accepted',
          imgsrc: secondCompany
        },
        {
          id: 9,
          name: '9',
          job: 'Swift Developer',
          status: 'rejected',
          imgsrc: thirdCompany
        },
        {
          id: 10,
          name: '10',
          job: '.NET Developer',
          status: 'pending',
          imgsrc: thirdCompany
        },
        {
          id: 11,
          name: '11',
          job: 'Javascript Developer',
          status: 'accepted',
          imgsrc: thirdCompany
        },
        {
          id: 12,
          name: '12',
          job: 'Web Developer',
          status: 'pending',
          imgsrc: firstCompany
        },
        {
          id: 13,
          name: '13',
          job: 'Java Developer',
          status: 'accepted',
          imgsrc: secondCompany
        },
        {
          id: 14,
          name: '14',
          job: 'Swift Developer',
          status: 'rejected',
          imgsrc: thirdCompany
        },
        {
          id: 15,
          name: '15',
          job: '.NET Developer',
          status: 'pending',
          imgsrc: thirdCompany
        },
        {
          id: 16,
          name: '16',
          job: 'Javascript Developer',
          status: 'accepted',
          imgsrc: thirdCompany
        },
        {
          id: 17,
          name: '17',
          job: 'Javascript Developer',
          status: 'accepted',
          imgsrc: thirdCompany
        },
        {
          id: 18,
          name: '18',
          job: 'Javascript Developer',
          status: 'accepted',
          imgsrc: thirdCompany
        },
        {
          id: 19,
          name: '19',
          job: 'Javascript Developer',
          status: 'accepted',
          imgsrc: thirdCompany
        },
        {
          id: 20,
          name: '20',
          job: 'Javascript Developer',
          status: 'accepted',
          imgsrc: thirdCompany
        },
        {
          id: 21,
          name: '21',
          job: 'Javascript Developer',
          status: 'accepted',
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
          <UserFeed
            internshipsApplied={this.state.userFeed.internshipsApplied}
          />
        </div>
        <div className='col-md-4'>
          <UserInfo userInfo={this.state.userInfo} />
        </div>
      </div>
    );
  }
}
