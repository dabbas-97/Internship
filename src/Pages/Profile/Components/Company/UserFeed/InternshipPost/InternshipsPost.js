import React, { useEffect, useState } from 'react';
import { EditPostForm } from './EditPostForm';
import { PostedInternships } from './PostedInternships';
import { InternshipsPoster } from './InternshipsPoster';
import { useAuth, db } from '../../../../../../Auth'
//------------

const InternshipsPost = ({ getStudentsApplied }) => {
  const [jobInfo, setJobInfo] = useState({ id: '', jobdesc: '', jobtitle: '', gpa: '2.5', gender: 'Male', specialty: 'IOS Developer', })
  const [step, setStep] = useState(1)
  const [posts, setPosts] = useState([])
  const [editPost, setEditPost] = useState('')
  const [loaded, setLoaded] = useState(false)
  const { auth } = useAuth();


  useEffect(() => {
    if (!loaded) {
      setPosts([])
      db.collection('internships').doc(auth.user.uid).collection('companyPosts').orderBy('createdAt').get()
        .then(snapshot => {
          if (snapshot.empty) {

          } else {

            snapshot.docs.forEach(doc => {
              let internshipsData = {
                id: doc.id,
                jobtitle: doc.data().jobtitle,
                jobdesc: doc.data().jobdesc,
                gpa: doc.data().gpa,
                gender: doc.data().gender,
                specialty: doc.data().specialty
              };
              setPosts(prev => [...prev, internshipsData])
            })
          } setLoaded(true)
        })
        .catch(err => console.log(err.message))
    }
    return () => { setLoaded(true) }

  }, [loaded])




  const handleChange = input => e => { setJobInfo({ ...jobInfo, [input]: e.target.value }) }


  const nextStep = () => {
    setStep(step + 1)
  };


  const handlePost = e => {
    //we take submited data and push it into posts array in the state. to show evenutally in the posted internships section.
    e.preventDefault();

    const { gpa, gender, specialty, jobtitle, jobdesc } = jobInfo;
    let newGender = []
    if (gender === 'Male') newGender.push('Male')
    else if (gender === 'Female') newGender.push('Female')
    else newGender.push('Female', 'Male')

    db.collection('internships').doc(auth.user.uid).collection('companyPosts').add({
      jobtitle: jobtitle,
      jobdesc: jobdesc,
      gpa: gpa,
      gender: newGender,
      specialty: specialty,
      companyId: auth.user.uid,
      createdAt: new Date()
    })



    let internshipsData = {
      id: Math.random() * 10000,
      jobtitle: jobtitle,
      jobdesc: jobdesc,
      gpa: gpa,
      gender: gender,
      specialty: specialty
    };
    setPosts([...posts, internshipsData])
    setJobInfo({
      specialty: 'IOS Developer',
      step: 1,
      jobdesc: '',
      jobtitle: '',
      gpa: '2.5',
      gender: 'Male'
    })
    setStep(1)
    setLoaded(false)

  };

  const handleDeletePosts = id => {


    db.collection('internships').doc(auth.user.uid).collection('companyPosts').doc(id).delete()


    setPosts(posts.filter(post => post.id !== id))
  };

  const clearPostInfo = () => {
    setEditPost('')
  };

  const submitEditedPost = newData => e => {
    e.preventDefault();

    let gender = []
    if (newData.gender === 'Male') gender.push('Male')
    else if (newData.gender === 'Female') gender.push('Female')
    else gender.push('Female', 'Male')



    db.collection('internships').doc(auth.user.uid).collection('companyPosts').doc(newData.id).update({
      jobtitle: newData.jobtitle,
      jobdesc: newData.jobdesc,
      gpa: newData.gpa,
      gender: gender,
      specialty: newData.specialty
    }).catch(err => console.log(err))



    let editedPost = {
      id: newData.id,
      jobtitle: newData.jobtitle,
      jobdesc: newData.jobdesc,
      gpa: newData.gpa,
      gender: newData.gender,
      specialty: newData.specialty
    };

    let tempPosts = [...posts];
    const index = posts.findIndex(post => post.id === newData.id);
    tempPosts.splice(index, 1);
    tempPosts.splice(index, 0, editedPost);
    setPosts(tempPosts)
    setEditPost(false)
  };


  const editModal = () => {
    if (editPost)
      return (
        <EditPostForm values={editPost} clearPostInfo={clearPostInfo} submitEditedPost={submitEditedPost} />
      );
  };
  const handleEditPosts = postEdit => {
    setEditPost(postEdit)

  };


  const { gender, gpa, jobtitle, jobdesc, specialty } = jobInfo;
  const values = { jobtitle, jobdesc, gender, gpa, specialty };
  return (
    <React.Fragment>
      <InternshipsPoster
        nextStep={nextStep}
        handleChange={handleChange}
        values={values}
        handlePost={handlePost}
        step={step}
      />
      <PostedInternships
        getStudentsApplied={getStudentsApplied}
        posts={posts}
        handleDeletePosts={handleDeletePosts}
        handleEditPosts={handleEditPosts}
      />
      {editModal()}
    </React.Fragment>
  );

}


export default InternshipsPost