import React, { Component } from 'react';
import './UserFeed.css';
import StudentCV from './StudentCV';
import { MdBusiness } from 'react-icons/md';
import { IoLogoApple, IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
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
  DiCodeBadge
} from 'react-icons/di';

export default class UserFeed extends Component {
  render() {
    const { internshipsApplied } = this.props;

    return (
      <div className='profileFeed'>
        <h4 className='text-uppercase title'>My feed</h4>
        <ul className='list-group list-group-flush text-center '>
          <li className='list-group-item'>
            <StudentCV />
          </li>
          <li className='list-group-item'>
            <CompaniesAppliedForComponent
              internshipsApplied={internshipsApplied}
            />
          </li>
        </ul>
      </div>
    );
  }
}

class CompaniesAppliedForComponent extends Component {
  state = {
    pages: 0
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
      <div className='appliedFor'>
        <h3 className=''>Companies You Applied For</h3>
        <div className='row feedContent '>
          <CompaniesAppliedFor
            internshipsApplied={appliedChunks[this.state.pages]}
          />
        </div>
        {showButtons()}
      </div>
    );
  }
}

function CompaniesAppliedFor(props) {
  const { internshipsApplied } = props;
  if (!internshipsApplied) {
    return (
      <div className='text-center col-12'>
        <h1 className='text-center'>you havnt applied to any company</h1>
      </div>
    );
  }
  const info = internshipsApplied.map(x => {
    const jobIcon = () => {
      if (x.job === 'IOS Developer') return <IoLogoApple />;
      else if (x.job === 'IOS Developer') return <IoLogoApple />;
      else if (x.job === 'Android Developer') return <FaAndroid />;
      else if (x.job === 'Java Developer') return <FaJava />;
      else if (x.job === 'Python Developer') return <FaPython />;
      else if (x.job === 'Linux Developer') return <FaLinux />;
      else if (x.job === 'Unity Developer') return <DiUnitySmall />;
      else if (x.job === 'Angular Developer') return <DiAngularSimple />;
      else if (x.job === 'PHP Developer') return <DiPhp />;
      else if (x.job === 'React JS Developer') return <DiReact />;
      else if (x.job === 'Wordpress Developer') return <DiWordpress />;
      else if (x.job === 'Javascript Developer') return <DiJavascript1 />;
      else if (x.job === 'HTML5 Developer') return <DiHtml5 />;
      else if (x.job === 'Database Developer') return <FaDatabase />;
      else if (x.job === '.NET Developer') return <DiDotnet />;
      else if (x.job === 'Larvel Developer') return <DiLaravel />;
      else if (x.job === 'Windows Applications Developer') return <DiWindows />;
      else if (x.job === 'Swift Developer') return <DiSwift />;
      else if (x.job === 'Web Developer') return <DiCodeBadge />;
    };
    const statusClass = () => {
      if (x.status === 'accepted')
        return 'accepted list-group-item text-uppercase ';
      else if (x.status === 'rejected')
        return 'rejected list-group-item text-uppercase';
      else return 'pending list-group-item text-uppercase';
    };
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
              <span className='job'>{jobIcon()}</span>
              {x.job}
            </li>
            <li className={statusClass()}>{x.status}</li>
          </ul>
        </div>
      </div>
    );
  });
  return <React.Fragment>{info}</React.Fragment>;
}

function Buttons(props) {
  if (props.pages === 0)
    return (
      <div className='form-inline justify-content-center col-12 my-1'>
        <div className='text-center m-4 '>
          <button type='button' className='btn' onClick={props.nextPage}>
            Next <IoIosArrowForward />
          </button>
        </div>
      </div>
    );
  else if (props.pages === props.maxPages)
    return (
      <div className='form-inline justify-content-center col-12 my-1'>
        <div className='text-center m-4 '>
          <button type='button' className='btn' onClick={props.prevPage}>
            <IoIosArrowBack /> Back
          </button>
        </div>
      </div>
    );
  else
    return (
      <div className='form-inline justify-content-center col-12 my-1'>
        <div className='text-center m-4 '>
          <button type='button' className='btn' onClick={props.prevPage}>
            <IoIosArrowBack /> Back
          </button>
        </div>
        <div className='text-center m-4 '>
          <button type='button' className='btn' onClick={props.nextPage}>
            Next <IoIosArrowForward />
          </button>
        </div>
      </div>
    );
}
