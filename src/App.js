import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './Pages/Nav/Nav';
import Login from './Pages/Login/Login';
import About from './Pages/About/About';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Chat from './Pages/Chat/Chat';
import InternShips from './Pages/InternShips/InternShips';
import NotFound from './Pages/NotFound';
import SignUp from './Pages/SignUp/SignUp';
import StudentSignUp from './Pages/SignUp/Components/StudentSignUp';
import CompanySignUp from './Pages/SignUp/Components/CompanySignUp';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute'
class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <div>
            <Nav />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <PrivateRoute exact path='/Profile' component={Profile} />
              <PrivateRoute exact path='/Chat' component={Chat} />
              <Route exact path='/Login' component={Login} />
              <Route exact path='/SignUp' component={SignUp} />
              <Route exact path='/SignUp/company' component={CompanySignUp} />
              <Route exact path='/SignUp/student' component={StudentSignUp} />
              <PrivateRoute exact path='/Internships' component={InternShips} />
              <Route path='/:notfound' component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthProvider>
    );
  }
}

export default App;
