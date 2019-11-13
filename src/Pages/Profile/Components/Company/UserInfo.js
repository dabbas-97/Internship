import React, { useState, useEffect } from 'react';

import { FaUserTie, FaQuoteLeft, FaQuoteRight, FaPen, FaEdit, FaRegEdit } from 'react-icons/fa';
import { MdAssignmentInd, MdLocationOn, MdPhone } from 'react-icons/md';
import { useAuth, db, toto } from '../../../../Auth'
import InputFiles from 'react-input-files';
import { Spinner } from 'react-bootstrap'
import Moment from 'react-moment';
import 'moment-timezone';

const UserInfo = () => {
  const [view, setView] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const changeView = () => {
    setView(!view);
  };
  const { auth } = useAuth();
  const [userInfo, setUserInfo] = useState({
    name: '',
    joined: '',
    bio: '',
    phone: '',
    location: '',
  })
  useEffect(() => {
    if (!loaded) {
      db.collection('users').doc(auth.user.uid).get()
        .then(doc => {
          setUserInfo(
            {
              userImg: auth.user.photoURL,
              name: doc.data().name,
              phone: doc.data().phone,
              location: doc.data().location,
              bio: doc.data().bio,
              joined: doc.data().joined.toDate()
            }
          )
          setLoaded(true)
        }
        ).catch(err => console.log(err.message))

    }
    return () => { setLoaded(true) }
  }, [])



  const handleChange = input => e => {
    setUserInfo({ ...userInfo, [input]: e.target.value })
  }
  const submitChanges = () => {
    toto.currentUser.updateProfile({ displayName: userInfo.name })
    db.collection('users').doc(auth.user.uid).update({
      name: userInfo.name,
      phone: userInfo.phone,
      location: userInfo.location,
      bio: userInfo.bio,
    })
    setView(true);

  };



  const imageUpload = file => {
    if (file.length > 0) {
      let src = URL.createObjectURL(file[0]);
      setUserInfo({ ...userInfo, userImg: src })
    }
  };
  const calendarStrings = {
    lastDay: '[Yesterday at] LT',
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    lastWeek: '[last] dddd [at] LT',
    nextWeek: 'dddd [at] LT',
    sameElse: 'L'
  };
  const userInfoPage = () => {
    if (view) return (
      <React.Fragment>
        <span className='editSpan' onClick={changeView}> <FaEdit /></span>

        <div className='profileImg'>
          <InputFiles onChange={imageUpload} style={{ outline: 'none' }}>
            <img src={userInfo.userImg} className='proImg rounded-circle' alt='profile ' />
          </InputFiles>
        </div>

        <ul className='list-group list-group-flush text-center'>

          <li className='list-group-item edit'>
            <span><FaUserTie /></span>
            {userInfo.name}
          </li>

          <li className='list-group-item edit'>
            <span> <MdLocationOn /> </span>
            {userInfo.location}
          </li>

          <li className='list-group-item edit'>
            <span> <MdPhone /> </span>
            {userInfo.phone}
          </li>

          <li className='list-group-item edit'>
            <span> <FaQuoteLeft /> </span>
            {userInfo.bio}
            <span><FaQuoteRight /> </span>
          </li>

          <li className='list-group-item'>
            <span> <MdAssignmentInd /> </span>
            <Moment calendar={calendarStrings}>{userInfo.joined}</Moment>
          </li>

        </ul>
      </React.Fragment>
    ); else return (
      <form onSubmit={submitChanges}>
        <span className='editSpan' > <FaRegEdit /></span>

        <div className='profileImg'>
          <InputFiles onChange={imageUpload} style={{ outline: 'none' }}>
            <img src={userInfo.userImg} className='proImg rounded-circle' alt='profile ' />
          </InputFiles>
        </div>

        <ul className='list-group list-group-flush text-center'>

          <li className='list-group-item '>
            <span> <FaUserTie /> </span>
            <input type='text' className='' placeholder='Your Name' onChange={handleChange('name')} defaultValue={userInfo.name} required />
          </li>

          <li className='list-group-item '>
            <span> <MdLocationOn /> </span>
            <input type='text' className='' placeholder='Location' onChange={handleChange('location')} defaultValue={userInfo.location} required />
          </li>

          <li className='list-group-item '>
            <span> <MdPhone /></span>
            <input type='text' className='' placeholder='Phone Number' onChange={handleChange('phone')} defaultValue={userInfo.phone} required />
          </li>
          <li className='list-group-item '>
            <span> <FaQuoteLeft /> </span>
            <textarea className=' form-control' onChange={handleChange('bio')} defaultValue={userInfo.bio} placeholder='Bio' />
            <span> <FaQuoteRight /> </span>
          </li>
        </ul>
        <button type='submit' className='btn editInfoBtn' >
          <span ><FaEdit /></span>
          Submit Changes
          </button>
      </form>
    )
  }


  return loaded ? (<div className='profileInfo'>{userInfoPage()}</div>) : (<div className='profileSpinner'>
    <Spinner animation="border" role="status" variant="info" >
      <span ></span>
    </Spinner>
  </div>)

}
export default UserInfo