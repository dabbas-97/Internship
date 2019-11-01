import React, { useState, useEffect } from 'react';
import UserInfo from './Components/Company/UserInfo';
import UserFeed from './Components/Company/UserFeed/UserFeed';

import { db, useAuth } from '../../Auth'
import { Spinner } from 'react-bootstrap'

const CompanyProfile = () => {
  const [studentsApplied, setStudentsApplied] = useState([])
  const { auth } = useAuth()
  // {
  //   id: 1,
  //     name: 'Mohammad Khaled',
  //       gender: 'Male',
  //         specialties: ['Web Developer', 'PHP Developer', 'Larvel Developer'],
  //           socialStatus: 'Engaged',
  //             education: {
  //     school: 'Al Al-Bait University',
  //       field: 'Computer Science',
  //         gpa: 'Excellent'
  //   },
  //   location: 'Amman'
  // }
  const getStudentsApplied = async (postId) => {
    const applicants = await db.collection('internships').doc(auth.user.uid).collection('companyPosts').doc(postId).collection('studentsApplied').get()
      .then(snapshot => {
        if (!snapshot.empty) {
          return snapshot.docs.map(doc => { console.log(doc.data()); return doc.data() })
        } else return null
      })
    if (applicants) {
      setStudentsApplied(applicants)
    } else console.log('no students applied to any of your posts')

  }



  return (
    <div className='container'>
      <div className='row mt-3'>

        <div className='col-md-8 '>
          <UserFeed studentsApplied={studentsApplied} getStudentsApplied={getStudentsApplied} />
        </div>

        <div className='col-md-4'>
          <UserInfo />
        </div>

      </div>
    </div>
  );

}
export default CompanyProfile