import React, { Component } from 'react';
import '../../../UserFeed.css';
import InternshipsPost from './InternshipPost/InternshipsPost';
import StudentsAppliesComponent from './StudentApplies/StudentAppliesComponent'


export default class UserFeed extends Component {
  render() {

    return (
      <div className='profileFeed'>
        <div className=' text-center mb-5 internshipPost'>
          <InternshipsPost getStudentsApplied={this.props.getStudentsApplied} />
        </div>
        <div className=' appliedList text-center'>
          <StudentsAppliesComponent studentsApplied={this.props.studentsApplied} />
        </div>
      </div>
    );
  }
}





