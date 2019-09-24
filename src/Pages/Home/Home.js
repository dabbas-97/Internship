import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import firstCompany from '../../images/firstCompany.jpg';
import secondCompany from '../../images/secondCompany.jpg';
import thirdCompany from '../../images/thirdCompany.jpg';
import { IoIosChatboxes } from 'react-icons/io';

export default class Home extends Component {
  render() {
    return (
      <div>
        <FirstPart />
        <SecondPart />
        <ThirdPart />
      </div>
    );
  }
}

class FirstPart extends Component {
  render() {
    return (
      <div className=' firstPart'>
        <div className='container '>
          <h1 className='h1-responsive'>Welcome To Internship Platform.</h1>
          <p className='p-3'>
            Internship Platform is a platform that is built to help IT students
            find companies that offer internships opportunities.
          </p>
          <Link to='/signin'>
            <button type='button' className='btn btn-lg'>
              Register now
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

class SecondPart extends Component {
  state = {
    cards: [
      {
        id: 1,
        src: firstCompany,
        name: 'Eskadinia',
        description:
          'The mission of ESKADENIA Software is to be a global provider of world-class software products, services and solutions that exceed customer expectations.',
        timeAdded: '1 hour ago'
      },
      {
        id: 2,
        src: secondCompany,
        name: 'Microsoft',
        description:
          'We’re on a mission to empower every person and every organization on the planet to achieve more.',
        timeAdded: '1 hour ago'
      },
      {
        id: 3,
        src: thirdCompany,
        name: 'Estarta ',
        description:
          'Estarta provides end to end global outsourcing solutions (offshore and onsite).',
        timeAdded: '1 hour ago'
      }
    ]
  };
  render() {
    return (
      <div className='secondPart container my-4'>
        <h3 className='text-center m-5 '>Recently Added Offers</h3>
        <div className=' card-deck'>
          <Card cards={this.state.cards} />
        </div>
      </div>
    );
  }
}
function Card(props) {
  const { cards } = props;
  const info = cards.map(x => {
    return (
      <div className='card' key={x.id}>
        <img src={x.src} className='card-img-top' alt='{props.name}' />
        <div className='card-body'>
          <h5 className='card-title'>{x.name}</h5>
          <p className='card-text'>{x.description}</p>
        </div>
        <div className='card-footer'>
          <small className='text-muted'>{x.timeAdded}</small>
        </div>
      </div>
    );
  });
  return <React.Fragment>{info}</React.Fragment>;
}

class ThirdPart extends React.Component {
  render() {
    return (
      <div className='thirdPart'>
        <div className='container'>
          <h3 className='h3-responsive'>Chat Rooms!</h3>
          <p className='p-lg-2'>
            You can now chat with other users of the platform.
          </p>
          <Link to='/chat'>
            <button type='button' className='btn btn-lg'>
              Chat Now <IoIosChatboxes color='white' />
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
