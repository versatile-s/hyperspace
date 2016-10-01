import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Dashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: this.props.history.username,
      category: 'home'
    };
    this.createHome = this.createHome.bind(this);

  }
  createHome() {
    fetch('/category', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        name: this.state.category
      })
    }).then(browserHistory.push('/' + this.state.username + "/home"));


    // browserHistory.push("/" + this.state.username + "/home");

  }

  render () {
    {console.log(this);}
    return (
      <div className="container">
        <div className="logo-space">
          <h2 className="dashboard-title">hyperspace</h2>

          <div className="dashboard-welcome-info">
            <p>Welcome to HYPERSPACE!</p> 
            <p>Please install our Chrome extension found <a href="www.justkidding.com" target="_blank">here</a>.</p>
            <p>Once that's installed, click "Create My First Home Page!" to get started!</p>
            <p>Your homepage can be found at hyprspace.me/{this.state.username}/home. </p>
            <p>(You can go ahead and set it to your default home page in Chrome now!) </p>
          
          </div>
          <button onClick={this.createHome}>Create My First Home Page!</button>
        </div>
      </div>
    );
  }
}

export default Dashboard;