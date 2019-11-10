import React from 'react';
import './Home.css';
import AddFooter from '../AddFooter';
import { HomeFirstPart } from './Components/Firstpart/HomeFirstPart';
import { HomeThirdPart } from './Components/ThirdPart/HomeThirdPart';
import { useAuth } from '../../Auth'

const Home = () => {
  const { auth } = useAuth();

  return (
    <div>
      {!auth.user ?
        (<HomeFirstPart />) :
        (<HomeThirdPart />)
      }
    </div>
  );

}

export default AddFooter(Home);
