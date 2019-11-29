import React, { Component, useState } from 'react';
import '../../UserFeed.css';
import StudentCV from './StudentCv/StudentCV';
import { MdBusiness, MdHelp } from 'react-icons/md';
import Buttons from '../../../Buttons'
import { Modal } from 'react-bootstrap'
import { IoLogoApple, IoMdBriefcase } from 'react-icons/io';
import { FaAndroid, FaJava, FaPython, FaLinux, FaDatabase } from 'react-icons/fa';
import { DiUnitySmall, DiAngularSimple, DiPhp, DiReact, DiLaravel, DiWordpress, DiJavascript1, DiDotnet, DiHtml5, DiWindows, DiSwift, DiCodeBadge, DiNodejsSmall } from 'react-icons/di';
import { db, useAuth } from '../../../../Auth'
import Moment from 'react-moment';
import 'moment-timezone';
import { Spinner } from 'react-bootstrap'


const UserFeed = (props) => {
  const { internshipsApplied } = props;
  const [jobStatus, setJobStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const { auth } = useAuth();
  const closeJobModal = () => {
    setJobStatus('')
  };

  //accepted: {    }
  const getStatus = async (id) => {
    setLoading(true)
    const postInfo = await db.collection('users').doc(auth.user.uid).collection('postsAppliedFor').doc(id).get()
      .then(doc => {
        return {
          status: doc.data().status,
          message: doc.data().message,
          contact: doc.data().contact,
          companyId: doc.data().companyId,
          interviewDate: doc.data().interviewDate
        }
      })
      .catch(err => console.log(err.message))
    const companyInfo = await db.collection('users').doc(postInfo.companyId).get()
      .then(doc => doc.data())
      .catch(err => console.log(err.message))
    const jobInfo = await db.collection('internships').doc(postInfo.companyId).collection('companyPosts').doc(id).get()
      .then(doc => doc.data())
      .catch(err => console.log(err.message))

    setJobStatus({
      status: postInfo.status,
      interviewDate: postInfo.interviewDate,
      message: postInfo.message,
      companyname: companyInfo.name,
      jobtitle: jobInfo.jobtitle,
      accepted: { location: companyInfo.location, phone: companyInfo.phone, contact: postInfo.contact }
    })
    setLoading(false)
  }
  const showStatus = () => {
    if (jobStatus)
      return (
        <InternshipStatus values={jobStatus} closeJobModal={closeJobModal} loading={loading} />
      );
  };



  return (
    <React.Fragment>
      <div className='profileFeed'>
        <div className=' text-center mb-5 mt-2 cv'>
          <StudentCV />
        </div>
        <div className=' appliedList text-center mb-5'>
          <CompaniesAppliedForComponent internshipsApplied={internshipsApplied} getStatus={getStatus} />
        </div>

      </div>
      {showStatus()}
    </React.Fragment>
  );

}
export default UserFeed

class CompaniesAppliedForComponent extends Component {
  state = {
    pages: 0,
  };
  //to split the companies applied for into 2 elements chunks
  pageRenderer() {
    const { internshipsApplied } = this.props;
    let i,
      j,
      pages = [],
      chunk = 2;
    for (i = 0, j = internshipsApplied.length; i < j; i += chunk) {
      pages.push(internshipsApplied.slice(i, i + chunk));
    }
    return pages;
  }

  render() {
    const appliedChunks = this.pageRenderer();
    const nextPage = () => {
      let { pages } = this.state;
      if (pages < appliedChunks.length - 1) this.setState({ pages: pages + 1 });
    };
    const prevPage = () => {
      let { pages } = this.state;
      if (pages > 0) this.setState({ pages: pages - 1 });
    };
    const showButtons = () => {
      if (appliedChunks.length > 1)
        return (
          <Buttons
            prevPage={prevPage}
            nextPage={nextPage}
            pages={this.state.pages}
            maxPages={appliedChunks.length - 1}
          />
        );
    };

    return (
      <div className='appliedFor m-3'>
        <h5 className='h5'>Internships You've Applied For</h5>
        <div className='feedContent m-3'>
          <div className='row  '>
            <CompaniesAppliedFor internshipsApplied={appliedChunks[this.state.pages]} getStatus={this.props.getStatus} />
          </div>
          {showButtons()}
        </div>
      </div>
    );
  }
}

function CompaniesAppliedFor(props) {
  const { internshipsApplied } = props;
  if (!internshipsApplied) {
    return (
      <div className='appliedFor m-4 col'>
        <h6 className='text-muted'>You havn't applied to any internships</h6>
      </div>
    );
  }
  const info = internshipsApplied.map(x => {
    const jobIcon = () => {
      switch (x.specialty) {
        case 'IOS Developer': return <IoLogoApple />;
        case 'Node JS Developer': return <DiNodejsSmall />;
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
        default: return <DiCodeBadge />;
      }

    };

    const status = () => {

      if (x.status === 'Accepted') {
        return <li className='accepted list-group-item ' onClick={() => props.getStatus(x.postId)}>{x.status}</li>
      } else if (x.status === 'Rejected') {
        return <li className='rejected list-group-item ' onClick={() => props.getStatus(x.postId)}>{x.status}</li>
      } else if (x.status === 'Interview') {
        return <li className='interview list-group-item ' onClick={() => props.getStatus(x.postId)}>Interview <Moment to={x.interviewDate.toDate()}>{new Date()}</Moment></li>
      }
      else return <li className='pending list-group-item '>Pending</li>

    }
    return (
      <div className='col-md-6' key={x.postId}>
        <div className='card '>
          <img src={x.companyPhoto} className='card-img-top' alt={x.companyName} />
          <ul className='list-group list-group-flush text-center'>

            <li className='list-group-item applied '>
              <span className='job'> <MdBusiness /> </span>
              {x.companyName}
            </li>

            <li className='list-group-item applied '>
              <span className='job'><IoMdBriefcase /></span>
              {x.jobtitle}
            </li>

            <li className='list-group-item togglerLi ' data-toggle='collapse' href={'#jobdesc' + x.postId} role='button'>
              <span className='job'><MdHelp /></span>
              Job Description
            </li>
            <li className='list-group-item applied collapse ' id={'jobdesc' + x.postId}>
              {x.jobdesc}
            </li>

            <li className='list-group-item togglerLi ' data-toggle='collapse' href={'#specialty' + x.postId} role='button'>
              <span className='job'><DiCodeBadge /></span>
              Specialty
            </li>

            <li className='list-group-item applied collapse' id={'specialty' + x.postId}>
              <span className='job'>{jobIcon()}</span>
              {x.specialty}
            </li>

            {status()}

          </ul>
        </div>
      </div>
    );
  });
  return <React.Fragment>{info}</React.Fragment>;
}

class InternshipStatus extends Component {
  render() {
    const { loading } = this.props
    const { status, companyname, jobtitle, message, interviewDate } = this.props.values;
    const values = { status, companyname, jobtitle, message, interviewDate }

    const returnMessage = () => { if (message) return (<p><span className='bold'>Message by {values.companyname} : </span> {message} </p>) }
    const returnAccepted = () => {
      if (values.status === 'Accepted' || 'Interview') return (
        <div>
          <p><span className='bold'>Comapany Location:  </span>  {this.props.values.accepted.location}</p>
          <p><span className='bold'>Comapany Phone Number: </span> {this.props.values.accepted.phone}</p>
          <p><span className='bold'>Contact us: </span> {this.props.values.accepted.contact}</p>
        </div>)
    }
    return (
      <React.Fragment>
        <Modal show={true} onHide={this.props.closeJobModal} dialogClassName="modal-class">
          {loading ? (<div className='profileSpinner'>
            <Spinner animation="border" role="status" variant="info" >
              <span ></span>
            </Spinner>
          </div>) : (<React.Fragment>
            <Modal.Header closeButton>
              <Modal.Title style={{ textAlign: "center" }}>Internship {values.status}</Modal.Title>
            </Modal.Header>
            <div className='statusMessage'>
              {values.status === 'Interview' ? (<React.Fragment>
                <p><span>{values.companyname}</span> has responded to your internship application for <span>{values.jobtitle}</span>.</p>
                <p>You have an interview scheduled at: <span><Moment format='DD/MMM/YYYY  HH:mm ' >{values.interviewDate.toDate()}</Moment></span> . </p>
              </React.Fragment>)
                : (<p>Your internship application for <span> {values.jobtitle} </span> in <span> {values.companyname} </span> has been <span className={values.status}> {values.status} </span>.</p>)}
              {returnMessage()}
              {returnAccepted()}
            </div>
          </React.Fragment>)}

        </Modal>
      </React.Fragment>
    );
  }
}
