import React, { Component } from 'react';
import firstCompany from '../../../images/firstCompany.jpg';
import secondCompany from '../../../images/secondCompany.jpg';
import thirdCompany from '../../../images/thirdCompany.jpg';

export class HomeSecondPart extends Component {
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
        <img src={x.src} className='card-img-top' alt={x.name} />
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
