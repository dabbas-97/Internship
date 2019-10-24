import React, { Component } from 'react';
import '../../UserFeed.css';
import StudentCV from './StudentCV';
import { MdBusiness, MdHelp } from 'react-icons/md';
import Buttons from '../../../Buttons'
import { Modal } from 'react-bootstrap'
import { IoLogoApple, IoMdBriefcase } from 'react-icons/io';
import {
  FaAndroid,
  FaJava,
  FaPython,
  FaLinux,
  FaDatabase
} from 'react-icons/fa';
import {
  DiUnitySmall,
  DiAngularSimple,
  DiPhp,
  DiReact,
  DiLaravel,
  DiWordpress,
  DiJavascript1,
  DiDotnet,
  DiHtml5,
  DiWindows,
  DiSwift,
  DiCodeBadge, DiNodejsSmall
} from 'react-icons/di';

export default class UserFeed extends Component {
  state = { jobstatus: '' }
  closeJobModal = () => {
    this.setState({ jobstatus: '' });
  };
  getStatus = () => {
    //axios get...
    const jobstatus = {
      status: 'Accepted',
      companyname: 'Microsoft',
      jobtitle: 'Software Engineer',
      message: 'We are so happy to accept you nigga!',
      accepted: { location: 'amman', contact: 'coco@yah.com', phone: '079555' }
    }
    this.setState({
      jobstatus: jobstatus
    });
  }
  showStatus = () => {
    if (this.state.jobstatus)
      return (
        <InternshipStatus
          values={this.state.jobstatus}
          closeJobModal={this.closeJobModal}

        />
      );
  };
  render() {
    const { internshipsApplied } = this.props;

    return (
      <React.Fragment>
        <div className='profileFeed'>
          <div className=' text-center mb-5 mt-2 cv'>
            <StudentCV />
          </div>
          <div className=' appliedList text-center'>
            <CompaniesAppliedForComponent
              internshipsApplied={internshipsApplied}
              getStatus={this.getStatus}
            />
          </div>

        </div>
        {this.showStatus()}
      </React.Fragment>
    );
  }
}

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
            <CompaniesAppliedFor
              internshipsApplied={appliedChunks[this.state.pages]}
              getStatus={this.props.getStatus}
            />
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
      if (x.specialty === 'IOS Developer') return <IoLogoApple />;
      else if (x.specialty === 'Node JS Developer') return <DiNodejsSmall />;
      else if (x.specialty === 'Android Developer') return <FaAndroid />;
      else if (x.specialty === 'Java Developer') return <FaJava />;
      else if (x.specialty === 'Python Developer') return <FaPython />;
      else if (x.specialty === 'Linux Developer') return <FaLinux />;
      else if (x.specialty === 'Unity Developer') return <DiUnitySmall />;
      else if (x.specialty === 'Angular Developer') return <DiAngularSimple />;
      else if (x.specialty === 'PHP Developer') return <DiPhp />;
      else if (x.specialty === 'React JS Developer') return <DiReact />;
      else if (x.specialty === 'Wordpress Developer') return <DiWordpress />;
      else if (x.specialty === 'Javascript Developer') return <DiJavascript1 />;
      else if (x.specialty === 'HTML5 Developer') return <DiHtml5 />;
      else if (x.specialty === 'Database Developer') return <FaDatabase />;
      else if (x.specialty === '.NET Developer') return <DiDotnet />;
      else if (x.specialty === 'Larvel Developer') return <DiLaravel />;
      else if (x.specialty === 'Windows Applications Developer') return <DiWindows />;
      else if (x.specialty === 'Swift Developer') return <DiSwift />;
      else if (x.specialty === 'Web Developer') return <DiCodeBadge />;
    };

    const status = () => {
      if (x.status === 'accepted') {
        return <li className='accepted list-group-item text-uppercase' onClick={props.getStatus}>{x.status}</li>
      } else if (x.status === 'rejected') {
        return <li className='rejected list-group-item text-uppercase' onClick={props.getStatus}>{x.status}</li>
      } else return <li className='pending list-group-item text-uppercase'>{x.status}</li>
    }
    return (
      <div className='col-md-6' key={x.id}>
        <div className='card '>
          <img src={x.imgsrc} className='card-img-top' alt={x.name} />

          <ul className='list-group list-group-flush text-center'>
            <li className='list-group-item applied '>
              <span className='job'>
                <MdBusiness />
              </span>
              {x.name}
            </li>
            <li className='list-group-item applied '>
              <span className='job'><IoMdBriefcase /></span>
              {x.jobtitle}
            </li>
            <li className='list-group-item togglerLi ' data-toggle='collapse'
              href={'#jobdesc' + x.id}
              role='button'>
              <span className='job'><MdHelp /></span>
              Job Description
            </li>
            <li className='list-group-item applied collapse ' id={'jobdesc' + x.id}>
              {x.jobdesc}
            </li>
            <li className='list-group-item togglerLi ' data-toggle='collapse'
              href={'#specialty' + x.id}
              role='button'>
              <span className='job'><DiCodeBadge /></span>
              Specialty
            </li>
            <li className='list-group-item applied collapse' id={'specialty' + x.id}>
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
    const { status, companyname, jobtitle, message } = this.props.values;
    const values = { status, companyname, jobtitle, message }

    const returnMessage = () => { if (message) return (<p><span className='bold'>Message by {values.companyname}:</span>{message}</p>) }
    const returnAccepted = () => {
      if (values.status === 'Accepted') return (
        <div>
          <p><span className='bold'>Comapany Location:</span> We are located at {this.props.values.accepted.location}</p>
          <p><span className='bold'>Comapany Phone Number:</span> {this.props.values.accepted.phone}</p>
          <p><span className='bold'>Contact us:</span> {this.props.values.accepted.contact}</p>
        </div>)
    }
    return (
      <React.Fragment>
        <Modal show={true} onHide={this.props.closeJobModal} >
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: "center" }}>Internship {values.status}</Modal.Title>
          </Modal.Header>
          <div>
            <p>Your internships apply for {values.job} in {values.companyname} has been {values.status}.</p>
            {returnMessage()}
            {returnAccepted()}
          </div>

        </Modal>
      </React.Fragment>
    );
  }
}
