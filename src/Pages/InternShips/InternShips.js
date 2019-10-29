import React, { useEffect, useState } from 'react';
import './InternShips.css';
import Buttons from '../Buttons'

//---------------icons
import { IoLogoApple } from 'react-icons/io';
import { FaAndroid, FaJava, FaPython, FaLinux, FaDatabase } from 'react-icons/fa';
import { DiUnitySmall, DiAngularSimple, DiPhp, DiReact, DiLaravel, DiWordpress, DiJavascript1, DiDotnet, DiHtml5, DiWindows, DiSwift, DiCodeBadge, DiNodejsSmall } from 'react-icons/di';

//----------------------
import firstCompany from '../../images/firstCompany.jpg';
import { CompaniesPosts } from './Components/CompaniesPosts';
import { db, useAuth } from '../../Auth'
import { Spinner } from 'react-bootstrap';


const InternShips = () => {
  const { auth } = useAuth()
  const [userInfo, setUserInfo] = useState({ gender: '', gpa: '' })
  const [loaded, setLoaded] = useState(false)
  const [postsReturned, setPostsReturnd] = useState(false)
  const [CV, setCV] = useState(null)
  const [specialities, setSpecialities] = useState(['IOS Developer',
    'Node JS Developer',
    'Android Developer'])
  const [posts, setPosts] = useState([{
    imgsrc: firstCompany,
    companyname: 'Eskadinia',
    jobtitle: 'Web Dev',
    jobdesc: 'We are looking for a ',
    specialty: 'Android Developer'

  }, {
    imgsrc: firstCompany,
    companyname: 'Eskadinia',
    jobtitle: 'Web Dev',
    jobdesc: 'We are looking for a ',
    specialty: 'Android Developer'

  }])
  const [specialtyPages, setSpecialtyPages] = useState([[0], [0]])

  useEffect(() => {
    let pages = specialities.map(() => [0])
    setSpecialtyPages(pages)
  }, [])

  useEffect(() => {
    if (!loaded) {
      db.collection('cv').doc(auth.user.uid).get().then(doc => {
        if (doc.exists) {
          setSpecialities(doc.data().specialities)
          setLoaded(true)
        } else setCV(false)
      })
    }
  }, [])
  useEffect(() => {
    if (!postsReturned) {
      db.collectionGroup('companyPosts').get().then(snapshots => {
        if (!snapshots.empty) {
          snapshots.forEach(snapshot => {
            setPosts([...posts, snapshot.data()])
            console.log(snapshot.data())
          })
        } else console.log('no posts')
        setPostsReturnd(true)
      })
    }
  }, [])





  if (loaded) {

    const opporunities = specialities.map(specialty => {
      const count = specialities.indexOf(specialty);
      const specialtyPosts = posts.filter(post => post.specialty === specialty)
      const pageRenderer = () => {
        let i,
          j,
          pages = [],
          chunk = 4;
        for (i = 0, j = specialtyPosts.length; i < j; i += chunk) {
          pages.push(specialtyPosts.slice(i, i + chunk));
        }
        return pages;
      }
      const appliedChunks = pageRenderer();



      const nextPage = () => {
        var tempSpecialtyPages = specialtyPages
        let pages = specialtyPages[count][0];

        if (pages < appliedChunks.length - 1) {
          pages++;
          tempSpecialtyPages[count][0] = pages
          setSpecialtyPages(tempSpecialtyPages)
        }
      };
      const prevPage = () => {
        var tempSpecialtyPages = specialtyPages
        let pages = specialtyPages[count][0];
        if (pages > 0) {
          pages--;
          tempSpecialtyPages[count][0] = pages
          setSpecialtyPages(tempSpecialtyPages)
        }
      };

      const showButtons = () => {
        if (appliedChunks.length > 1)
          return (
            <Buttons
              prevPage={prevPage}
              nextPage={nextPage}
              pages={specialtyPages[count][0]}
              maxPages={appliedChunks.length - 1}
            />
          );
      };



      const specialtyIcon = () => {
        if (specialty === 'IOS Developer') return <IoLogoApple />;
        else if (specialty === 'Node JS Developer') return <DiNodejsSmall />;
        else if (specialty === 'Android Developer') return <FaAndroid />;
        else if (specialty === 'Java Developer') return <FaJava />;
        else if (specialty === 'Python Developer') return <FaPython />;
        else if (specialty === 'Linux Developer') return <FaLinux />;
        else if (specialty === 'Unity Developer') return <DiUnitySmall />;
        else if (specialty === 'Angular Developer') return <DiAngularSimple />;
        else if (specialty === 'PHP Developer') return <DiPhp />;
        else if (specialty === 'React JS Developer') return <DiReact />;
        else if (specialty === 'Wordpress Developer') return <DiWordpress />;
        else if (specialty === 'Javascript Developer') return <DiJavascript1 />;
        else if (specialty === 'HTML5 Developer') return <DiHtml5 />;
        else if (specialty === 'Database Developer') return <FaDatabase />;
        else if (specialty === '.NET Developer') return <DiDotnet />;
        else if (specialty === 'Larvel Developer') return <DiLaravel />;
        else if (specialty === 'Windows Applications Developer') return <DiWindows />;
        else if (specialty === 'Swift Developer') return <DiSwift />;
        else if (specialty === 'Web Developer') return <DiCodeBadge />;
      }




      return (
        <div className='specialty' key={specialty}>
          <div className='row'>
            <div className='col'>
              <h3 className='h3'>
                <span>{specialtyIcon()}</span>
                {specialty}
              </h3>
            </div>
          </div>
          <div className='m-4'>
            <div className='row'>
              <CompaniesPosts posts={appliedChunks[specialtyPages[count]]} />
            </div></div>
          {showButtons()}
        </div>
      )
    })

    return <React.Fragment>
      <div className='container opportunities'>
        <h1>InternShips available for you</h1>
        {opporunities}
      </div>
    </React.Fragment>
  } else return <Spinner animation="border" role="status" variant="info" >
    <span ></span>
  </Spinner>
}

export default InternShips