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
        const internships = await db.collection('users').doc(auth.user.uid).collection('postsAppliedFor').get().then(snapshot => {
          if (!snapshot.empty) {
            return snapshot.docs.map(doc => doc.data())
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
          <UserInfo />
        </div>
      </div>
    </div>
  )



}
export default StudentProfile