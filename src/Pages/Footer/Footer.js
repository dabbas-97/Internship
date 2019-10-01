import React, { Component } from 'react';
import './Footer.css';
import { IoLogoTwitter } from 'react-icons/io';
import { IoLogoFacebook } from 'react-icons/io';
import { IoLogoGithub } from 'react-icons/io';

export default class Footer extends Component {
  render() {
    return (
      <div className='  mt-lg-5 footer text-center '>
        <a className='footerIcon'>
          <IoLogoFacebook color='#3b5998' />
        </a>
        <a className='footerIcon'>
          <IoLogoTwitter color='#1DA1F2' />
        </a>
        <a className='footerIcon'>
          <IoLogoGithub color='black' />
        </a>
      </div>
    );
  }
}
