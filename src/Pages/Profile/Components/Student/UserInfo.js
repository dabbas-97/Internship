import React, { useState, useEffect, useContext } from 'react';
import { IoMdMale, IoMdFemale } from 'react-icons/io';
import {
  FaBirthdayCake,
  FaUserGraduate,
  FaQuoteLeft,
  FaQuoteRight,
  FaPen
} from 'react-icons/fa';
import { MdAssignmentInd, MdLocationOn, MdPhone } from 'react-icons/md';
import { Birthday } from '../../../SignUp/Components/Student/Birthday';
import InputFiles from 'react-input-files';
import { AuthContext } from '../../../../Auth'
import { db } from '../../../../Config/fbConfig'
import profileImg from '../../../../images/education.png';

const UserInfo = (props) => {
  const [view, setView] = useState(true)
  const { currentUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    name: '',
    gender: '',
    phone: '',
    day: '',
    month: '',
    year: '',
    date: '',
    birthday: '',
    bio: '',
    location: '',
    userImg: profileImg
  })
  useEffect(() => {
    db.collection('users').doc(currentUser.uid).get()
      .then(doc => {
        setUserInfo(
          {
            ...userInfo,
            name: doc.data().name,
            gender: doc.data().gender,
            phone: doc.data().phone,
            location: doc.data().hometown,
            bio: doc.data().bio,
            birthday: doc.data().birthday,
            day: doc.data().birthday.split('/')[0],
            month: doc.data().birthday.split('/')[1],
            year: doc.data().birthday.split('/')[2]
          }
        )
      }
      ).catch(err => console.log(err.message))
  }, [])



  const genderIcon = () => {
    if (userInfo.gender === 'male') return <IoMdMale />;
    else if (userInfo.gender === 'female') return <IoMdFemale />;
  };

  const changeView = () => {
    setView(!view);
  };


  const submitChanges = () => {
    db.collection('users').doc(currentUser.uid).update({
      name: userInfo.name,
      gender: userInfo.gender,
      phone: userInfo.phone,
      hometown: userInfo.location,
      bio: userInfo.bio,
      birthday: `${userInfo.day}/${userInfo.month}/${userInfo.year}`
    })
    setView(true);

  };
  const imageUpload = file => {
    if (file.length > 0) {
      let src = URL.createObjectURL(file[0]);
      setUserInfo({ ...userInfo, userImg: src })
    }
  };
  const handleChange = input => e => {
    setUserInfo({ ...userInfo, [input]: e.target.value })
  }
  const userInfoPage = () => {
    if (view) return (
      <React.Fragment>
        <span className='editSpan' onClick={changeView}> <FaPen /> </span>

        <div className='profileImg'>
          <InputFiles onChange={imageUpload} style={{ outline: 'none' }}>
            <img src={userInfo.userImg} className='proImg rounded-circle' alt='profile ' />
          </InputFiles>
        </div>

        <ul className='list-group list-group-flush text-center'>

          <li className='list-group-item '>
            <span> <FaUserGraduate /> </span>
            {userInfo.name}
          </li>

          <li className='list-group-item '>
            <span>{genderIcon()}</span>
            {userInfo.gender}
          </li>

          <li className='list-group-item '>
            <span><FaBirthdayCake /></span>
            {userInfo.day}/{userInfo.month}/{userInfo.year}
          </li>

          <li className='list-group-item '>
            <span> <MdLocationOn /> </span>
            {userInfo.location}
          </li>

          <li className='list-group-item '>
            <span> <MdPhone /> </span>
            {userInfo.phone}
          </li>

          <li className='list-group-item '>
            <span> <FaQuoteLeft /></span>
            {userInfo.bio}
            <span> <FaQuoteRight /></span>
          </li>

          <li className='list-group-item'>
            <span> <MdAssignmentInd /> </span>
            {userInfo.date}
          </li>

        </ul>
      </React.Fragment>
    ); else return (
      <form onSubmit={submitChanges}>
        <span className='editSpan' onClick={changeView}> <FaPen /> </span>

        <div className='profileImg'>
          <InputFiles onChange={imageUpload} style={{ outline: 'none' }}>
            <img src={userInfo.userImg} className='proImg rounded-circle' alt='profile ' />
          </InputFiles>
        </div>

        <ul className='list-group list-group-flush text-center'>

          <li className='list-group-item '>
            <span> <FaUserGraduate /> </span>
            <input type='text' className='' placeholder='Your Name' onChange={handleChange('name')} defaultValue={userInfo.name} required />
          </li>

          <li className='list-group-item '>
            <span>{genderIcon()}</span>
            <select name='gender' className='' onChange={handleChange('gender')} value={userInfo.gender}  >
              <option value='female'>Female</option>
              <option value='male'>Male</option>
            </select>
          </li>

          <li className='list-group-item '>
            <span> <FaBirthdayCake /> </span>
            <Birthday handleChange={handleChange} values={userInfo} />
          </li>

          <li className='list-group-item '>
            <span> <MdLocationOn /></span>
            <input type='text' className='' placeholder='Location' onChange={handleChange('location')} defaultValue={userInfo.location} required />
          </li>

          <li className='list-group-item '>
            <span> <MdPhone /></span>
            <input type='text' className='' placeholder='Phone Number' onChange={handleChange('phone')} defaultValue={userInfo.phone} required />
          </li>

          <li className='list-group-item '>
            <span><FaQuoteLeft /></span>
            <textarea className=' form-control' onChange={handleChange('bio')} defaultValue={userInfo.bio} placeholder='Bio' />
            <span> <FaQuoteRight /> </span>
          </li>
        </ul>
        <button type='submit' className='btn editInfoBtn' >
          <span> <FaPen /> </span>
          Submit Changes
          </button>
      </form>
    )
  }


  return <div className='profileInfo'>{userInfoPage()}</div>

}

export default UserInfo