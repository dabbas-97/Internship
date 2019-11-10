import React, { Component } from 'react';
import './Footer.css';
import { IoLogoTwitter } from 'react-icons/io';
import { IoLogoFacebook } from 'react-icons/io';
import { IoLogoGithub } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
  render() {
    return (
      <div className=' footer text-center '>
        <Link className='footerIcon' to='about'>
          <IoLogoFacebook color='#3b5998' />
        </Link>
        <Link className='footerIcon' to='about'>
          <IoLogoTwitter color='#1DA1F2' />
        </Link>
        <Link className='footerIcon' to='about'>
          <IoLogoGithub color='black' />
        </Link>
      </div>
    );
  }
}
