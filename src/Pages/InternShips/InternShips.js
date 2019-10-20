import React, { Component } from 'react';
import './InternShips.css';
import Buttons from '../Buttons'

//---------------icons
import { IoLogoApple } from 'react-icons/io';
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

//----------------------
import firstCompany from '../../images/firstCompany.jpg';
import secondCompany from '../../images/secondCompany.jpg';
import thirdCompany from '../../images/thirdCompany.jpg';

export default class InternShips extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specialties: [
        'IOS Developer',
        'Node JS Developer',
        'Android Developer'
      ],
      posts: [{
        imgsrc: firstCompany,
        companyname: 'Eskadinia',
        jobtitle: 'Web Dev',
        jobdesc: 'We are looking for a gay phagoot',
        specialty: 'Android Developer'

      }, {
        imgsrc: firstCompany,
        companyname: 'Eskadinia',
        jobtitle: 'Web Dev',
        jobdesc: 'We are looking for a gay phagoot',
        specialty: 'Android Developer'

      }, {
        imgsrc: firstCompany,
        companyname: 'Eskadinia',
        jobtitle: 'Web Dev',
        jobdesc: 'We are looking for a gay phagoot',
        specialty: 'Android Developer'

      }, {
        imgsrc: firstCompany,
        companyname: 'Eskadinia',
        jobtitle: 'Web Dev',
        jobdesc: 'We are looking for a gay phagoot',
        specialty: 'Android Developer'

      }, {
        imgsrc: firstCompany,
        companyname: 'Eskadinia',
        jobtitle: 'Web Dev',
        jobdesc: 'We are looking for a gay phagoot',
        specialty: 'Android Developer'

      }, {
        imgsrc: firstCompany,
        companyname: 'Eskadinia',
        jobtitle: 'Web Dev',
        jobdesc: 'We are looking for a gay phagoot',
        specialty: 'Android Developer'

      }, {
        imgsrc: firstCompany,
        companyname: 'Eskadinia',
        jobtitle: 'Web Dev',
        jobdesc: 'We are looking for a gay phagoot',
        specialty: 'Android Developer'

      }, {
        imgsrc: secondCompany,
        companyname: 'Microsoft',
        jobtitle: 'Web Dev',
        jobdesc: 'We are looking for a gay phagoot',
        specialty: 'IOS Developer',

      }, {
        imgsrc: thirdCompany,
        companyname: 'Estarta ',
        jobtitle: 'Web Dev',
        jobdesc: 'We are looking for a gay phagoot',
        specialty: 'Node JS Developer',

      }],
      specialtypages: [[]]
    }

  }
  UNSAFE_componentWillMount() {
    var specialtypages = this.state.specialties.map(x => [0])
    this.setState({ specialtypages: specialtypages })
  }

  render() {

    const opporunities = this.state.specialties.map(specialty => {
      const count = this.state.specialties.indexOf(specialty);
      const { posts } = this.state
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


      console.log(appliedChunks)
      const nextPage = () => {
        var { specialtypages } = this.state
        let pages = specialtypages[count][0];
        console.log(specialtypages)
        if (pages < appliedChunks.length - 1) {
          pages++;
          specialtypages[count][0] = pages
          this.setState({ specialtypages: specialtypages });
        }
      };
      const prevPage = () => {
        var { specialtypages } = this.state
        let pages = specialtypages[count][0];
        if (pages > 0) {
          pages--;
          specialtypages[count][0] = pages
          this.setState({ specialtypages: specialtypages });
        }
      };
      const showButtons = () => {
        if (appliedChunks.length > 1)
          return (
            <Buttons
              prevPage={prevPage}
              nextPage={nextPage}
              pages={this.state.specialtypages[count][0]}
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
          <div className='row'>
            <CompaniesPosts posts={appliedChunks[this.state.specialtypages[count]]} />
          </div>
          {showButtons()}
        </div>
      )
    })
    console.log(this.state.specialtypages)
    return <div className='container opportunities'>
      {opporunities}
    </div>
  }
}

function CompaniesPosts(props) {
  const { posts } = props;
  if (!posts) {
    return (
      <div className='appliedFor m-4  col  '>
        <h6 className='text-muted'>There are no posts for this specialty</h6>
      </div>
    );
  }
  const specialtyPosts = posts.map(post => {
    return (
      <div className='col-md-3 col-sm-6 ' key={Math.round(Math.random() * 10000)}>
        <div className='card companyPost'>
          <img src={post.imgsrc} className='card-img-top' alt={post.companyname} />
          <ul className='list-group list-group-flush text-center'>
            <li className='list-group-item applied '>
              {post.companyname}
            </li>
            <li className='list-group-item applied '>
              {post.jobtitle}
            </li>
            <li className='list-group-item togglerLi ' data-toggle='collapse'
              href={'#description' + post.id}
              role='button'>
              Job Description
            </li>
            <li className='list-group-item applied collapse' id={'description' + post.id}>
              {post.jobdesc}
            </li>
            <li className='list-group-item applied '>
              <button type='button' className='btn' >Apply Now</button>
            </li>
          </ul>
        </div>
      </div>

    )
  })

  return (<React.Fragment>{specialtyPosts}</React.Fragment>)
}