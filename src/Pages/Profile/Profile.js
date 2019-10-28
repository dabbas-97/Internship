import React, { useContext, useState, useEffect } from 'react';
import './Profile.css';
import CompanyProfile from './CompanyProfile';
import StudentProfile from './StudentProfile';
import { AuthContext } from '../../Auth'
import { db } from '../../Config/fbConfig'
const Profile = () => {
  const [type, setType] = useState('')
  const { currentUser } = useContext(AuthContext);
  const id = currentUser.uid
  useEffect(() => {
    db.collection('users').doc(id).get().then(doc => setType(doc.data().type)).catch(err => console.log(err.message))
  }, [])
 
  
  return <React.Fragment>{type==='student'? <StudentProfile /> :<CompanyProfile />}</React.Fragment>

}
export default Profile