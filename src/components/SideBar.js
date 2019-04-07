import React, { Component } from 'react'
import { userService } from '../services/user.service';
import './sidebar.css'
const avatar = require('../assets/icon.svg')
const toolsImg = require('../assets/tools.svg')
const presetsImg = require('../assets/settings.svg')


class SideBar extends Component {
  state = {
    teams: [1, 2, 3, 4, 5, 6, 7]
  }

  renderTeams = () => {
    const teams = this.state.teams.map((el, key) => {
      return (
        <li key={key} className="team">
          <img src={avatar} alt="team-avatar" className="avatar"/>
          <span className="team-name">Team {el}</span>
        </li>
      )
    })
    return teams
  }

  handleLogoutButtonClick = () => {
    userService.logout();
    this.props.history.push('/login');
  }

  render() { 
    return (
      <div className="sidebar-container">
        <span style={{margin: '1em 0 2.5em 0'}}>
          <span className="departments-header">Departments</span>
            <div className="departments">
              <ul className="teams">
                {this.renderTeams()}
              </ul>
            </div>
        </span>
        <span style={{width: '100%', margin: '1em 0 2.5em 0'}}>
          <span className="departments-header">Settings</span>
            <ul className="teams">
              <li className="team">
                <img src={toolsImg} alt="tools" className="avatar"/>
                <span className="team-name">Tools</span>
              </li>
              <li className="team">
                <img src={presetsImg} alt="presets" className="avatar"/>
                <span className="team-name">Presets</span>
              </li>
            </ul>
        </span>
//         <span className="logout">Logout</span>

//         <div className="departments">
//           <ul className="teams">
//             {this.renderTeams()}
//           </ul>
//         </div>
//         <div className="settings">
        
//         </div>
        <button className="logout" onClick={this.handleLogoutButtonClick}>Logout</button>
      </div>
    );
  }
}
 
export default SideBar;