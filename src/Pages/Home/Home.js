import React, { Component } from 'react';
import './Home.css';
import { HomeFirstPart } from './Components/HomeFirstPart';
import { HomeSecondPart } from './Components/HomeSecondPart';
import { HomeThirdPart } from './Components/HomeThirdPart';

export default class Home extends Component {
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
