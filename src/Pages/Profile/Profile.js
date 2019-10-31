import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Spinner } from 'react-bootstrap'

import { useAuth, db } from '../../Auth'
import { Redirect } from 'react-router-dom'
const Profile = () => {
  const [type, setType] = useState()
  const [loaded, setLoaded] = useState(false)
  const { auth } = useAuth();
  const id = auth.user.uid


  useEffect(() => {
    if (!loaded) {
      const doc = db.collection('users').doc(id)
      doc.get().then(doc => { setType(doc.data().type); setLoaded(true) }).catch(err => console.log(err))
    }
    return () => {

    }
  }, [loaded])

  if (loaded) {
    if (type === 'student') return <Redirect to='/profile/studentprofile' />
    else return <Redirect to='/profile/companyprofile' />


  } else return (<div className='profileSpinner'><Spinner animation="border" role="status" variant="info" >
    <span ></span>
  </Spinner></div>)


}
export default Profile