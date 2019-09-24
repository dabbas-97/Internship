import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './Pages/Nav/Nav';
import Login from './Pages/Login/Login';
import About from './Pages/About/About';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Chat from './Pages/Chat/Chat';
import Footer from './Pages/Footer/Footer';
import InternShips from './Pages/InternShips/InternShips';
import NotFound from './Pages/NotFound';

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
