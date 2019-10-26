import React, { Component } from 'react';
import './Home.css';
import AddFooter from '../AddFooter';
import { HomeFirstPart } from './Components/Firstpart/HomeFirstPart';
import { HomeSecondPart } from './Components/SecondPart/HomeSecondPart';
import { HomeThirdPart } from './Components/ThirdPart/HomeThirdPart';

class Home extends Component {
  render() {
    return (
      <div>
        <HomeFirstPart />
        <HomeSecondPart />
        <HomeThirdPart />
      </div>
    );
  }
}

export default AddFooter(Home);
