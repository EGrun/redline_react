import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import Login from './components/Login';
import Home from "./components/Home"
import AdminBar from './components/AdminBar';
import SideBar from './components/SideBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
            <div>
                <PrivateRoute exact path="/" component={Home} />
                <Route path="/login" component={Login} />
            </div>
        </Router>
      </div>
    );
  }
}

export default App;
