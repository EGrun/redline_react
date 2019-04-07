import React, { Component } from 'react'
import './sidebar.css'
const avatar = require('../assets/icon.svg')

class SideBar extends Component {
  state = {
    teams: [1, 2, 3, 4, 5, 6, 7]
  }

  renderTeams = () => {
    const teams = this.state.teams.map((el, key) => {
      return (
        <li id={key} className="team">
          <img src={avatar} alt="team-avatar" className="avatar"/>
          <span className="team-name">Team {el}</span>
        </li>
      )
    })
    return teams
  }

  render() { 
    return (
      <div className="sidebar-container">
        <div className="departments">
          <ul className="teams">
            {this.renderTeams()}
          </ul>
        </div>
        <div className="settings">
        
        </div>
        <button className="logout"></button>
      </div>
    );
  }
}
 
export default SideBar;