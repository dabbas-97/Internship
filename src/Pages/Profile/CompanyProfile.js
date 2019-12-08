import React, { useState } from 'react';
import UserInfo from './Components/Company/UserInfo';
import UserFeed from './Components/Company/UserFeed/UserFeed';

import { db, useAuth } from '../../Auth'

const CompanyProfile = () => {
  const [studentsApplied, setStudentsApplied] = useState([])
  const [postId, setPostId] = useState('')
  const { auth } = useAuth()

  const getStudentsApplied = async (postId) => {
    if (postId) {
      setPostId(postId)
      setStudentsApplied(null)
      const applicants = await db.collection('internships').doc(auth.user.uid).collection('companyPosts').doc(postId).collection('studentsApplied').get()
        .then(async snapshot => {
          if (!snapshot.empty) {
            const info = await Promise.all(snapshot.docs.map(async doc => {
              const studentId = await doc.data().studentId
              const studentInfo = await db.collection('users').doc(studentId).get()
                .then(doc => {
                  if (doc.exists) return doc.data()
                  else {
                    db.collection('internships').doc(auth.user.uid).collection('companyPosts').doc(postId).collection('studentsApplied').doc(studentId).delete()
                    db.collection('users').doc(studentId).collection('postsAppliedFor').doc(postId).delete()
                    return null
                  }
                })
                .catch(err => console.log(err.message))
              if (studentInfo) {
                const status = await db.collection('users').doc(doc.data().studentId).collection('postsAppliedFor').doc(postId).get().then(doc => doc.data().status).catch(err => console.log(err.message))
                const studentCV = await db.collection('cv').doc(doc.data().studentId).get()
                  .then(doc => doc.data())
                  .catch(err => console.log(err.message))
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
              } return null
            }))
            return await Promise.all(info.filter(student => student))
          } else return null
        })
        .catch(err => console.log(err.message))
      if (applicants) {
        setStudentsApplied(applicants)
      } else setStudentsApplied([])
    } else {
      setStudentsApplied([])
      setPostId('')
    }
  }
  const deleteUser = async () => {
    var answer = window.confirm("Are You Sure You Want To Delete Your Account?")
    if (answer) {
      await db.collection('users').doc(auth.user.uid).delete().catch(err => console.log(err.message))
      auth.user.delete().catch(err => {
        auth.signout()
        console.log(err.message)
      })
    }


  }


  return (
    <div className='container'>
      <div className='row mt-3'>
        <div className='col-md-8 '>
          <UserFeed studentsApplied={studentsApplied} getStudentsApplied={getStudentsApplied} postId={postId} />
        </div>

        <div className='col-md-4'>
          <UserInfo deleteUser={deleteUser} />
        </div>

      </div>
    </div>
  );

}
export default CompanyProfile