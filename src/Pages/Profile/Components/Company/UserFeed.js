import React, { Component } from 'react';
import '../../UserFeed.css';
import InternshipsPost from './InternshipsPost';
import Buttons from '../../../Buttons';
import { MdLocationOn, MdSchool, MdClose, MdCheck } from 'react-icons/md';
import {
  IoLogoApple,
  IoMdMale,
  IoMdFemale
} from 'react-icons/io';
import {
  FaAndroid,
  FaJava,
  FaPython,
  FaLinux,
  FaDatabase,
  FaUserGraduate,
  FaSchool,
  FaCode,
  FaUniversity
} from 'react-icons/fa';
import { FiPercent } from 'react-icons/fi';
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
  render() {
    const { studentsApplied } = this.props;

    return (
      <div className='profileFeed'>
        <div className=' text-center mb-5 internshipPost'>
          <InternshipsPost
            getStudentsWhoApplied={this.props.getStudentsWhoApplied}
          />
        </div>
        <div className=' appliedList text-center'>
          <StudentsAppliesComponent studentsApplied={studentsApplied} />
        </div>
      </div>
    );
  }
}

class StudentsAppliesComponent extends Component {
  state = {
    pages: 0
  };
  acceptStudent = () => { }; //function for accepting a student
  rejectStudent = () => { }; //function for rejecting a student

  //to split the companies applied for into 2 elements chunks
  pageRenderer() {
    const { studentsApplied } = this.props;
    let i,
      j,
      pages = [],
      chunk = 2;
    for (i = 0, j = studentsApplied.length; i < j; i += chunk) {
      pages.push(studentsApplied.slice(i, i + chunk));
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
        <h5 className='h5'>Students who have applied to your internships.</h5>
        <div className='feedContent m-3'>
          <div className='row  '>
            <StudentsApplies
              studentsApplied={appliedChunks[this.state.pages]}
              acceptStudent={this.acceptStudent}
              rejectStudent={this.rejectStudent}
            />
          </div>
          {showButtons()}
        </div>
      </div>
    );
  }
}

function StudentsApplies(props) {
  const { studentsApplied } = props;
  if (!studentsApplied) {
    return (
      <div className='appliedFor m-4  col  '>
        <h6 className='text-muted'>
          No Students have applied to any of your Internship posts.
        </h6>
      </div>
    );
  }
  const info = studentsApplied.map(data => {
    const renderSpecialties = data.specialties.map(specialty => {
      const jobIcon = () => {
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
        else if (specialty === 'Windows Applications Developer')
          return <DiWindows />;
        else if (specialty === 'Swift Developer') return <DiSwift />;
        else if (specialty === 'Web Developer') return <DiCodeBadge />;
      };

      return (
        <div className='row' key={Math.random()}>
          <div className='col my-1'>
            <span className='job'>{jobIcon()}</span>
            {specialty}
          </div>
        </div>
      );
    });
    const genderIcon = () => {
      if (data.gender === 'Female') return <IoMdFemale />;
      else return <IoMdMale />;
    };
    return (
      <div className='col-md-6' key={data.id}>
        <div className='card '>
          <img src={data.imgsrc} className='card-img-top' alt={data.name} />

          <ul className='list-group list-group-flush text-center'>
            <li className='list-group-item applied '>
              <span className='job'>
                <FaUserGraduate />
              </span>
              {data.name}
            </li>
            <li className='list-group-item applied '>
              <span className='job'>{genderIcon()}</span>
              {data.gender}
            </li>
            <li className='list-group-item applied '>
              <span className='job'>
                <MdLocationOn />
              </span>
              {data.location}
            </li>
            <li
              className='list-group-item applied togglerLi '
              data-toggle='collapse'
              href={'#education' + data.id}
              role='button'
              aria-expanded='false'
            >
              <div className='row '>
                <div className='col'>
                  <span className='job'>
                    <FaSchool />
                  </span>
                  Education
                </div>
              </div>
            </li>
            <li
              className='list-group-item applied collapse'
              id={'education' + data.id}
            >
              <div className='row my-1'>
                <div className='col'>
                  <span className='job'>
                    <FaUniversity />
                  </span>
                  {data.education.school}
                </div>
              </div>
              <div className='row my-1'>
                <div className='col'>
                  <span className='job'>
                    <MdSchool />
                  </span>
                  {data.education.field}
                </div>
              </div>
              <div className='row my-1'>
                <div className='col'>
                  <span className='job'>
                    <FiPercent />
                  </span>
                  {data.education.gpa}
                </div>
              </div>
            </li>
            <li
              className='list-group-item applied togglerLi '
              data-toggle='collapse'
              href={'#specialties' + data.id}
              role='button'
              aria-expanded='false'
            >
              <div className='row '>
                <div className='col'>
                  <span className='job'>
                    <FaCode />
                  </span>
                  Specialties
                </div>
              </div>
            </li>
            <li
              className='list-group-item applied collapse'
              id={'specialties' + data.id}
            >
              {renderSpecialties}
            </li>
            <li className='list-group-item applied '>
              <div className='form-inline justify-content-center my-1'>
                <div className='text-center mx-1 '>
                  <button
                    type='button'
                    className='btn rejected'
                    onClick={props.rejectStudent}
                  >
                    Reject <MdClose />
                  </button>
                </div>
                <div className='text-center mx-1 '>
                  <button
                    type='button'
                    className='btn accepted'
                    onClick={props.acceptStudent}
                  >
                    Accept <MdCheck />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  });
  return <React.Fragment>{info}</React.Fragment>;
}

