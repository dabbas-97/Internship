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
      async function toto() {
        const internships = await db.collection('users').doc(auth.user.uid).collection('postsAppliedFor').get().then(async snapshot => {
          if (!snapshot.empty) {
            const posts = await Promise.all(snapshot.docs.map(async doc => {
              const exists = await db.collection('internships').doc(doc.data().companyId).collection('companyPosts').doc(doc.data().postId).get()
                .then(doc => {
                  if (doc.exists) {
                    return doc.data()
                  } else return null
                })
              if (exists) {
                const companyInfo = await db.collection('users').doc(doc.data().companyId).get()
                  .then(doc => {
                    if (doc.exists) {
                      return doc.data()
                    } else return null
                  })
                const jobInfo = await db.collection('internships').doc(doc.data().companyId).collection('companyPosts').doc(doc.data().postId).get()
                  .then(doc => doc.data())

                return {
                  response: doc.data().response,
                  companyName: companyInfo.name,
                  jobdesc: jobInfo.jobdesc,
                  jobtitle: jobInfo.jobtitle,
                  specialty: jobInfo.specialty,
                  status: doc.data().status,
                  postId: doc.data().postId
                }
              }
              else db.collection('users').doc(auth.user.uid).collection('postsAppliedFor').doc(doc.data().postId).delete()
            }))
            return await posts.filter(post => post !== undefined)
          } else return null
        })
        if (internships) {
          setInternshipsApplied(internships)
        } else console.log('you havent applied to any posts!')
        setInternshipsFetched(true)
      }
      toto()
    }

  }, [internshipsFetched])

  useEffect(() => {
    console.log(internshipsApplied)

  }, [internshipsApplied])

  const deleteUser = async () => {
    let id = await auth.user.uid
    auth.user.delete()
      .then(() => {
        db.collection('users').doc(id).delete()
        db.collection('users').doc(id).collection('postsAppliedFor').get().then(snapshot => {
          if (!snapshot.empty) {
            snapshot.docs.forEach(doc => {
              db.collection('users').doc(id).collection('postsAppliedFor').doc(doc.id).delete()
            })
          }
        })
        db.collection('cv').doc(id).delete()
      })
      .catch(err => console.log(err.message))
  }
  return (
    <div className='container'>
      {/* <button className='btn' onClick={() => deleteUser()}>deletee</button> */}
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
          <UserInfo />
        </div>
      </div>
    </div>
  )



}
export default StudentProfile