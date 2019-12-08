import React, { useState, useEffect } from 'react';
import UserInfo from './Components/Student/UserInfo';
import UserFeed from './Components/Student/UserFeed';
import { db, useAuth } from '../../Auth'
import { Spinner } from 'react-bootstrap'

const StudentProfile = () => {
  const { auth } = useAuth()
  const [internshipsApplied, setInternshipsApplied] = useState([])
  const [internshipsFetched, setInternshipsFetched] = useState(false)
  useEffect(() => {
    if (!internshipsFetched) {
      async function getInternships() {
        const internships = await db.collection('users').doc(auth.user.uid).collection('postsAppliedFor').get()
          .then(async snapshot => {
            if (!snapshot.empty) {
              const posts = await Promise.all(snapshot.docs.map(async doc => {
                const applyId = doc.id
                const exists = await db.collection('internships').doc(doc.data().companyId).collection('companyPosts').doc(doc.data().postId).get()
                  .then(doc => {
                    if (doc.exists) {
                      return doc.data()
                    } else return null
                  })
                  .catch(err => console.log(err.message))
                if (exists) {
                  const companyInfo = await db.collection('users').doc(doc.data().companyId).get()
                    .then(doc => {
                      if (doc.exists) {
                        return doc.data()
                      } else {
                        db.collection('users').doc(auth.user.uid).collection('postsAppliedFor').doc(applyId).delete()
                        return null
                      }
                    })
                    .catch(err => console.log(err.message))
                  if (companyInfo) {
                    const jobInfo = await db.collection('internships').doc(doc.data().companyId).collection('companyPosts').doc(doc.data().postId).get()
                      .then(doc => doc.data())
                      .catch(err => console.log(err.message))

                    return {
                      companyPhoto: companyInfo.photoURL,
                      interviewDate: doc.data().interviewDate,
                      companyName: companyInfo.name,
                      jobdesc: jobInfo.jobdesc,
                      jobtitle: jobInfo.jobtitle,
                      specialty: jobInfo.specialty,
                      status: doc.data().status,
                      postId: doc.data().postId
                    }
                  } else db.collection('internships').doc(doc.data().companyId).collection('companyPosts').doc(doc.data().postId).collection('studentApplied').doc(auth.use.uid).delete()

                }
                else db.collection('users').doc(auth.user.uid).collection('postsAppliedFor').doc(doc.data().postId).delete()
              }))
              return await posts.filter(post => post !== undefined)
            } else return null
          })
          .catch(err => console.log(err.message))
        if (internships) {
          setInternshipsApplied(internships)
        }
        setInternshipsFetched(true)
      }
      getInternships()
    }

  }, [internshipsFetched])



  const deleteUser = async () => {
    var answer = window.confirm("Are You Sure You Want To Delete Your Account?")
    if (answer) {
      await db.collection('users').doc(auth.user.uid).delete().catch(err => console.log(err.message))
      await db.collection('cv').doc(auth.user.uid).delete().catch(err => console.log(err.message))
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
          {internshipsFetched ? (
            <UserFeed internshipsApplied={internshipsApplied} />
          ) : (
              <div className='profileSpinner'>
                <Spinner animation="border" role="status" variant="info" >
                  <span ></span>
                </Spinner>
              </div>
            )
          }
        </div>
        <div className='col-md-4'>
          <UserInfo deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  )



}
export default StudentProfile