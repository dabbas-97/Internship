import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Login from './components/Login/Login';
import About from './components/About/About';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Chat from './components/Chat/Chat';
import Footer from './components/Footer/Footer';
import InternShips from './components/InternShips/InternShips';
import NotFound from './components/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/Profile' component={Profile} />
            <Route exact path='/Chat' component={Chat} />
            <Route exact path='/Login' component={Login} />
            <Route exact path='/Internships' component={InternShips} />
            <Route path='/:notfound' component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
