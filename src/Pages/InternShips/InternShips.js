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
import { async, Promise } from 'q';
import { database } from 'firebase';


const InternShips = () => {
  const { auth } = useAuth()
  const [gotCV, setGotCV] = useState(false)
  const [postsReturned, setPostsReturnd] = useState(false)
  const [postsInfoReturned, setPostsInfoReturned] = useState(false)
  const [postsFetched, setPostsFetched] = useState(false)
  const [gotSpecialities, setGotSpecialities] = useState(false)

  const [gpa, setGpa] = useState(null)
  const [gender, setGender] = useState(null)
  const [specialities, setSpecialities] = useState(null)
  const [companiesNumber, setCompaniesNumber] = useState(0)

  const [posts, setPosts] = useState([])



  const [postsInfo, setPostsInfo] = useState(null)
  const [companyInfo, setCompanyInfo] = useState([])
  const [specialtyPages, setSpecialtyPages] = useState(null)
  const [specialtyPagesAreDone, setSpecialtyPagesAreDone] = useState(false)

  useEffect(() => {
    if (specialities) {
      if (!specialtyPagesAreDone) {
        let pages = specialities.map(() => [0])
        setSpecialtyPages(pages)
        setSpecialtyPagesAreDone(true)
      }

    }

  }, [specialities])

  useEffect(() => {
    if (!gotCV) {
      db.collection('cv').doc(auth.user.uid).get().then(doc => {
        if (doc.exists) {
          setSpecialities(doc.data().specialities)
          setGpa(doc.data().gpa)
          setGotCV(true)
        } else {
          console.log(`No 'CV' record for this user`)
          setGotCV(true)
        }


      })

    }
  }, [])
  useEffect(() => {
    if (specialities) {
      setGotSpecialities(true)
    }

  }, [specialities])

  useEffect(() => {
    if (!gender) {
      db.collection('users').doc(auth.user.uid).get().then(doc => {
        if (doc.exists) {
          setGender(doc.data().gender)
        } else console.log(`User doesnt have a record in "users" collection`)
      })
    }
  }, [])

  useEffect(() => {
    if (gender && gpa) {
      if (!postsReturned) {
        console.log(gpa, gender)
        db.collectionGroup('companyPosts').where('gender', 'array-contains', gender).where('gpa', '<=', gpa).get().then(snapshots => {
          if (!snapshots.empty) {
            addPostInfo(snapshots.docs)
            setPostsReturnd(true)
          } else console.log('no posts')
          setPostsFetched(true)
        })
      }
    }
  }, [gpa, gender])


  useEffect(() => {
    if (postsReturned) {
      if (!postsInfoReturned) {
        const companies = [...new Set(postsInfo.map(post => post.companyId))] //removing duplicates 
        setCompaniesNumber(companies.length)
        const fetchData = (companyId) => {
          db.collection('users').doc(companyId).get().then(doc => {
            setCompanyInfo(companyInfo => [...companyInfo, doc.data()])
          })


        }

        companies.forEach(post => {
          fetchData(post)

        })
        if (companyInfo.length === companies.length) setPostsInfoReturned(true)

      }

    }


  }, [postsReturned, companyInfo])

  const addPostInfo = (posts) => {

    setPostsInfo(posts.map(post => {
      return {
        postId: post.id,
        companyId: post.data().companyId,
        jobdesc: post.data().jobdesc,
        jobtitle: post.data().jobtitle,
        gpa: post.data().gpa,
        gender: post.data().gender,
        specialty: post.data().specialty
      }
    }))
  }

  useEffect(() => {

    if (postsInfoReturned && postsReturned) {
      if (companyInfo.length === companiesNumber && postsInfo) {
        const finalPosts = postsInfo.map(post => {
          const id = post.companyId
          const company = companyInfo.filter(companies => {
            return companies.companyId === id
          })
          return {
            postId: post.postId,
            companyId: post.companyId,
            jobtitle: post.jobtitle,
            jobdesc: post.jobdesc,
            gpa: post.gpa,
            specialty: post.specialty,
            companyBio: company[0].bio,
            companyLocation: company[0].location,
            companyName: company[0].name,
            companyPhone: company[0].phone,
          }
        })
        setPostsFetched(true)
        setPosts(finalPosts)
      }



    }


  }, [postsInfoReturned, companyInfo])

  useEffect(() => {
    console.log(posts)

  }, [posts])


  if (gotCV) {

    if (specialities) {



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


        const nextPage = async () => {
          var tempSpecialtyPages = specialtyPages
          let pages = specialtyPages[count][0];

          if (pages < appliedChunks.length - 1) {
            setPostsFetched(false)
            pages++;
            tempSpecialtyPages[count][0] = pages
            await setSpecialtyPages(tempSpecialtyPages)
            setPostsFetched(true)
          }
        };
        const prevPage = async () => {
          var tempSpecialtyPages = specialtyPages
          let pages = specialtyPages[count][0];
          if (pages > 0) {
            setPostsFetched(false)
            pages--;
            tempSpecialtyPages[count][0] = pages
            await setSpecialtyPages(tempSpecialtyPages)
            setPostsFetched(true)
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
          switch (specialty) {
            case 'Node JS Developer': return <DiNodejsSmall />;
            case 'IOS Developer': return <IoLogoApple />;
            case 'Android Developer': return <FaAndroid />;
            case 'Java Developer': return <FaJava />;
            case 'Python Developer': return <FaPython />;
            case 'Linux Developer': return <FaLinux />;
            case 'Unity Developer': return <DiUnitySmall />;
            case 'Angular Developer': return <DiAngularSimple />;
            case 'PHP Developer': return <DiPhp />;
            case 'React JS Developer': return <DiReact />;
            case 'Wordpress Developer': return <DiWordpress />;
            case 'Javascript Developer': return <DiJavascript1 />;
            case 'HTML5 Developer': return <DiHtml5 />;
            case 'Database Developer': return <FaDatabase />;
            case '.NET Developer': return <DiDotnet />;
            case 'Larvel Developer': return <DiLaravel />;
            case 'Windows Applications Developer': return <DiWindows />;
            case 'Swift Developer': return <DiSwift />;
            case 'Web Developer': return <DiCodeBadge />;
            default: break;
          }
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
                {postsFetched ? (<CompaniesPosts posts={appliedChunks[specialtyPages[count]]} />) : (<div className='profileSpinner'>
                  <Spinner animation="border" role="status" variant="info" >
                    <span ></span>
                  </Spinner>
                </div>)}
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
    } else return <div className='text-center'><h1>Please create your cv first.</h1></div>
  } else return <div className='profileSpinner'>
    <Spinner animation="border" role="status" variant="info" >
      <span ></span>
    </Spinner>
  </div>
}

export default InternShips