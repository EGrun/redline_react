import React, { Component } from 'react';
import './App.css';
import Home from "./components/Home"
import AdminBar from './components/AdminBar';
import SideBar from './components/SideBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AdminBar />
        <Home />
      </div>
    );
  }
}

export default App;
