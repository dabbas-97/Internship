import React, { Component } from 'react';
import UserInfo from './Components/Company/UserInfo';
import UserFeed from './Components/Company/UserFeed';

export default class CompanyProfile extends Component {
  state = {
    userInfo: {
      name: 'Microsoft',
      date: '2 Months ago',
      bio: 'bio...bio...bio...bio...',
      location: 'Jarash'
    },
    userFeed: {},
    userCV: {}
  };

  render() {
    return (
      <div className='row '>
        <div className='col-md-8 '>
          <UserFeed />
        </div>
        <div className='col-md-4'>
          <UserInfo userInfo={this.state.userInfo} />
        </div>
      </div>
    );
  }
}
