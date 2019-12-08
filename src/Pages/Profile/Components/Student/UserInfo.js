import React, { useState, useEffect } from 'react';
import { IoMdMale, IoMdFemale } from 'react-icons/io';
import {
  FaBirthdayCake,
  FaUserGraduate,
  FaQuoteLeft,
  FaQuoteRight,
  FaPen
} from 'react-icons/fa';
import { MdAssignmentInd, MdLocationOn, MdPhone } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import { Birthday } from '../../../SignUp/Components/Student/Birthday';
import InputFiles from 'react-input-files';
import { useAuth, db, storage, config } from '../../../../Auth'
import Moment from 'react-moment';
import 'moment-timezone';
import { Spinner } from 'react-bootstrap'

const UserInfo = ({ deleteUser }) => {
  const [view, setView] = useState(true)
  const [validDate, setValidDate] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)

  const { auth } = useAuth();
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    if (!loaded) {
      db.collection('users').doc(auth.user.uid).get()
        .then(doc => {
          setUserInfo(
            {
              userImg: doc.data().photoURL,
              name: doc.data().name,
              gender: doc.data().gender,
              phone: doc.data().phone,
              location: doc.data().hometown,
              bio: doc.data().bio,
              birthday: doc.data().birthday,
              day: doc.data().birthday.split('/')[0],
              month: doc.data().birthday.split('/')[1],
              year: doc.data().birthday.split('/')[2],
              joined: doc.data().joined.toDate()
            }
          )
          setLoaded(true)
        }
        ).catch(err => console.log(err.message))
    }
    return () => { setLoaded(true) }
  }, [])



  const genderIcon = () => {
    if (userInfo.gender === 'Male') return <IoMdMale />;
    else if (userInfo.gender === 'Female') return <IoMdFemale />;
  };


  const isBirthdayValid = () => {
    if (validDate) return 'd-none'
    else return 'invalid-feedback'
  }

  const submitChanges = (e) => {
    e.preventDefault()
    const { name, gender, phone, location, bio } = userInfo
    const validateBirthday = () => {
      const userMonth = () => {
        switch (userInfo.month) {
          case 'JAN': return '0'
          case 'FEB': return '01'
          case 'MAR': return '02'
          case 'APR': return '03'
          case 'MAY': return '04'
          case 'JUN': return '05'
          case 'JUL': return '06'
          case 'AUG': return '07'
          case 'SEP': return '08'
          case 'OCT': return '09'
          case 'NOV': return '10'
          case 'DEC': return '11'
          default: break;
        }
      }
      var date = new Date()

      date.setFullYear(date.getFullYear() - 18)

      var selectedDate = new Date(Number(userInfo.year), Number(userMonth()), Number(userInfo.day))
      if (selectedDate.getTime() > date.getTime()) { setValidDate(false); return false }
      else { setValidDate(true); return true }
    }


    if (validateBirthday() && name.trim() && phone.trim() && location.trim()) {
      db.collection('users').doc(auth.user.uid).update({
        name: name.trim(),
        gender: gender,
        phone: phone.trim(),
        hometown: location.trim(),
        bio: bio.trim(),
        birthday: `${userInfo.day}/${userInfo.month}/${userInfo.year}`
      })
      setView(true);
    }


  };
  const imageUpload = file => {
    if (file.length > 0) {
      setImageUploading(true)
      let src = URL.createObjectURL(file[0]);
      setUserInfo({ ...userInfo, userImg: src })
      storage.ref().child(`usersImages/${auth.user.uid}`).put(file[0])
        .then(() => {
          const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/usersImages%2F${auth.user.uid}?alt=media`
          return db.collection('users').doc(auth.user.uid).update({
            photoURL: imageUrl
          })
        })
        .then(() => setImageUploading(false))
        .catch(err => console.log(err.message))
    }
  };
  const handleChange = input => e => {
    setUserInfo({ ...userInfo, [input]: e.target.value })
  }
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
        <span className='editSpan' onClick={() => setView(false)}> <FaPen /> </span>

        <div className='profileImg'>
          <InputFiles onChange={imageUpload} style={{ outline: 'none' }}>
            <img src={userInfo.userImg} className='proImg rounded-circle' alt='profile ' />
          </InputFiles>
          {imageUploading && (<div className='imageUploadSpinner'>
            <Spinner animation="border" role="status" >
              <span ></span>
            </Spinner>
          </div>)}
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
            <Moment calendar={calendarStrings}>{userInfo.joined}</Moment>
          </li>

        </ul>
      </React.Fragment>
    ); else return (
      <form onSubmit={submitChanges}>
        <span className='editSpan' > <FaPen /> </span>

        <div className='profileImg'>
          <InputFiles onChange={imageUpload} style={{ outline: 'none' }}>
            <img src={userInfo.userImg} className='proImg rounded-circle' alt='profile ' />
          </InputFiles>
          {imageUploading && (<div className='imageUploadSpinner'>
            <Spinner animation="border" role="status" >
              <span ></span>
            </Spinner>
          </div>)}
        </div>

        <ul className='list-group list-group-flush text-center'>

          <li className='list-group-item '>
            <span> <FaUserGraduate /> </span>
            <input type='text' className='' placeholder='Your Name' onChange={handleChange('name')} defaultValue={userInfo.name} required />
          </li>

          <li className='list-group-item '>
            <span>{genderIcon()}</span>
            <select name='gender' className='' onChange={handleChange('gender')} value={userInfo.gender}  >
              <option value='Female'>Female</option>
              <option value='Male'>Male</option>
            </select>
          </li>

          <li className='list-group-item '>
            <span> <FaBirthdayCake /> </span>
            <Birthday handleChange={handleChange} values={userInfo} />
            <div className={isBirthdayValid()}>Please enter a valid birthday (18+)</div>
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


  return loaded ? (<React.Fragment>
    <div className='profileInfo'>{userInfoPage()}</div>
    <div className='deleteAcc' onClick={() => deleteUser()}>Delete Account <TiDelete /></div>
  </React.Fragment>

  ) : (<div className='profileSpinner'>
    <Spinner animation="border" role="status" variant="info" >
      <span ></span>
    </Spinner>
  </div>)

}

export default UserInfo