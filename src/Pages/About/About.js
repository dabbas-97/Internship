import React, { Component } from 'react';
import './About.css';
import AddFooter from '../AddFooter';
import huLogo from '../../images/huLogo.jpg'

class About extends Component {
  render() {
    return (
      <div className='about'>
        <div className='container'>

          <div className='row'>
            <img src={huLogo} alt='Hashmite University' />
          </div>
          <hr />
          <div className='row'>

            <div className='col text-center'>
              <h3 >About Us</h3>
            </div>
          </div>
          <div className='m-5'>
            <div className='row'>

              <div className='col-6'>
                <div className='card mb-3'>
                  <div class="card-header">Computer Science Department</div>
                  <div class="card-body">
                    <h5 class="card-title">Ahmad Shtayeh</h5>
                    <p class="card-text"> 1631346</p>
                  </div>
                </div>
              </div>

              <div className='col-6'>
                <div className='card mb-3'>
                  <div class="card-header">Software Engineering Department</div>
                  <div class="card-body">
                    <h5 class="card-title">Sara Al-Qaddoumi</h5>
                    <p class="card-text"> 1531419</p>
                  </div>
                </div>
              </div>

            </div>

            <div className='row'>

              <div className='col-6'>
                <div className='card mb-3'>
                  <div class="card-header">Computer Information Systems Department</div>
                  <div class="card-body">
                    <h5 class="card-title">Marya Al-Sawafta</h5>
                    <p class="card-text">1538719</p>
                  </div>
                </div>
              </div>

              <div className='col-6'>
                <div className='card mb-3'>
                  <div class="card-header">Business Information Technology Department</div>
                  <div class="card-body">
                    <h5 class="card-title">Hamzeh Dabbas</h5>
                    <p class="card-text">1530635</p>
                  </div>
                </div>
              </div>

            </div>

          </div>




        </div>
      </div>
    );
  }
}

export default AddFooter(About);
