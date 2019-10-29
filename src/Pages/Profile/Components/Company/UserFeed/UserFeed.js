import React, { Component } from 'react';
import '../../../UserFeed.css';
import InternshipsPost from './InternshipPost/InternshipsPost';
import StudentsAppliesComponent from './StudentApplies/StudentAppliesComponent'


export default class UserFeed extends Component {
  render() {
    const { studentsApplied } = this.props;

    return (
      <div className='profileFeed'>
        <div className=' text-center mb-5 internshipPost'>
          <InternshipsPost />
        </div>
        <div className=' appliedList text-center'>
          <StudentsAppliesComponent studentsApplied={studentsApplied} />
        </div>
      </div>
    );
  }
}





