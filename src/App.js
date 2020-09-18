import React from 'react';
import Home from './features/home';
import SignIn from './features/signin';
import SignUp from './features/signup';
import './App.css';
import { Switch, useLocation, Route } from 'react-router';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Switch location={location}>
        <Route path="/signin/" component={SignIn} exact={true} />
        <Route path="/signup/" component={SignUp} exact={true} />
        <Route path="/" component={Home} exact={true} />
      </Switch>
    </div>
  );
}

export default App;
