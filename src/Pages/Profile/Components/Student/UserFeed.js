import React, { Component } from 'react';
import './UserFeed.css';

export default class UserFeed extends Component {
  render() {
    console.log(this.props.userFeed);
    return (
      <div className='container'>
        <div className='profileFeed'>
          <h4 className='text-uppercase title'>user feed</h4>
          <hr />

          <div className='feedContent'>
            <div className='card-group'>
              <CompaniesAppliedFor userFeed={this.props.userFeed} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function CompaniesAppliedFor(props) {
  const { userFeed } = props;
  const info = userFeed.map(x => {
    return (
      <div className='card' key={x.id}>
        <img src={x.imgsrc} className='card-img-top' alt={x.name} />

        <div className='card-footer'>
          <h5 className='card-title'>{x.name}</h5>
          <p className='card-text'>{x.job}</p>
          <small className='text-muted'>{x.status}</small>
        </div>
      </div>
    );
  });
  return <React.Fragment>{info}</React.Fragment>;
}
