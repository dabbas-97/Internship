import React, { useEffect, useState } from 'react';
import jsonData from '../../../suggestions.json';
import { EditCV } from './EditCV';
import { CreateCV } from './CreateCV';
import { db, useAuth } from '../../../../../Auth'

const KeyCodes = {
  comma: 188,
  enter: 13
};

export const delimiters = [KeyCodes.comma, KeyCodes.enter];
const loadData = () => JSON.parse(JSON.stringify(jsonData));

const StudentCV = () => {
  const { auth } = useAuth()
  const [loaded, setLoaded] = useState(false)
  const [step, setStep] = useState(1)
  const [isCV, setIsCV] = useState(false)
  const [cvInfo, setCVInfo] = useState({
    socialStatus: 'Single',
    education: {
      school: 'Hashemite University',
      field: 'Computer Science'
    },
    gpa: '2.5'
  })
  const [tags, setTags] = useState([])
  const [suggestions] = useState(loadData())


  useEffect(() => {
    if (!loaded) {
      db.collection('cv').doc(auth.user.uid).get().then(doc => {
        if (doc.exists) {
          setIsCV(true)
          setCVInfo({
            socialStatus: doc.data().socialStatus,
            education: { school: doc.data().school, field: doc.data().field },
            gpa: doc.data().gpa,
          })
          setTags(doc.data().specialities.map(x => { return { id: x, text: x } }))
        }
        setLoaded(true)
      }).catch(err => console.log(err.message))
    }

  }, [])



  const nextStep = () => {
    setStep(step + 1)
  };

  const handleChange = (input, inside) => e => {
    if (input === 'education') {
      var education = { ...cvInfo.education };
      education[inside] = e.target.value;
      setCVInfo({ ...cvInfo, education });
    } else setCVInfo({ ...cvInfo, [input]: e.target.value });
  };

  //------------------------------------------------Input module stuff-------------------------------------

  const handleDelete = i => {
    setTags(
      tags.filter((tag, index) => index !== i)
    );
  };

  const handleAddition = tag => {
    if (suggestions.find(x => x === tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  //------------------------------------------------------------------------------------
  const submitCV = e => {
    e.preventDefault();

    db.collection('cv').doc(auth.user.uid).set({
      socialStatus: cvInfo.socialStatus,
      school: cvInfo.education.school,
      field: cvInfo.education.field,
      gpa: cvInfo.gpa,
      specialities: tags.map(tag => tag.text)
    })

    setStep(step - 1)
    setIsCV(true)
  };

  const { socialStatus, education, gpa } = cvInfo;
  const values = {
    socialStatus,
    tags,
    education,
    gpa
  };
  const showCV = () => {
    if (!isCV)
      return (
        <CreateCV
          nextStep={nextStep}
          handleChange={handleChange}
          values={values}
          step={step}
          tags={tags}
          suggestions={suggestions}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          onSubmit={submitCV}
        />
      );
    else
      return (
        <EditCV
          nextStep={nextStep}
          handleChange={handleChange}
          step={step}
          tags={tags}
          suggestions={suggestions}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          onSubmit={submitCV}
          values={values}
        />
      );
  };
  return <React.Fragment>{showCV()}</React.Fragment>;
}


export default StudentCV