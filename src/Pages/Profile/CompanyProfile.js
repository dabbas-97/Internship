import React, { useState } from 'react';
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
            const studentInfo = await db.collection('users').doc(doc.data().studentId).get()
              .then(doc => doc.data())
            const studentCV = await db.collection('cv').doc(doc.data().studentId).get()
              .then(doc => doc.data())
            const allInfo = {
              studentId: doc.data().studentId,
              studentName: studentInfo.name,
              studentPhoto: studentInfo.photoURL,
              studentGender: studentInfo.gender,
              studentHometown: studentInfo.hometown,
              studentBirthday: studentInfo.birthday,
              studentPhone: studentInfo.phone,
              studentSchool: studentCV.school,
              studentField: studentCV.field,
              studentGpa: studentCV.gpa,
              studentSpecialities: studentCV.specialities,
              studentSocial: studentCV.socialStatus,
            }
            if (status) return { ...allInfo, status }
            else return allInfo


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