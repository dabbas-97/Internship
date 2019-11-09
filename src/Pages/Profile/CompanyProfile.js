import React, { useState, useEffect } from 'react';
import UserInfo from './Components/Company/UserInfo';
import UserFeed from './Components/Company/UserFeed/UserFeed';

import { db, useAuth } from '../../Auth'

const CompanyProfile = () => {
  const [studentsApplied, setStudentsApplied] = useState([])
  const [postId, setPostId] = useState('')
  const { auth } = useAuth()

  const getStudentsApplied = async (postId) => {
    setPostId(postId)
    const applicants = await db.collection('internships').doc(auth.user.uid).collection('companyPosts').doc(postId).collection('studentsApplied').get()
      .then(async snapshot => {
        if (!snapshot.empty) {
          return await Promise.all(snapshot.docs.map(async doc => {
            const status = await db.collection('users').doc(doc.data().studentId).collection('postsAppliedFor').doc(postId).get().then(doc => doc.data().status)
            console.log(doc.data());
            if (status) return { ...doc.data(), status }
            else return doc.data()

          }))
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
          <UserFeed studentsApplied={studentsApplied} getStudentsApplied={getStudentsApplied} postId={postId} />
        </div>

        <div className='col-md-4'>
          <UserInfo />
        </div>

      </div>
    </div>
  );

}
export default CompanyProfile