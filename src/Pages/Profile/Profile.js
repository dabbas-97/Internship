import React, { Component } from 'react';
import './Profile.css';
import CompanyProfile from './CompanyProfile';
import StudentProfile from './StudentProfile';
export default class Profile extends Component {
  state = { type: 2 };
  profileReturner = () => {
    if (this.state.type === 1) return <StudentProfile />;
    else if (this.state.type === 2) return <CompanyProfile />;
  };
  render() {
    return <React.Fragment>{this.profileReturner()}</React.Fragment>;
  }
}
