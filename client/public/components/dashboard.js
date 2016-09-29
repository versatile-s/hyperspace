import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Dashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: 'fart'
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
        name: 'home'
      })
    }).then(browserHistory.push("/" + this.state.username + "/home"));


    // browserHistory.push("/" + this.state.username + "/home");

  }

  render () {
    return (
      <div className="container">
        <div className="logo-space">
          <h2>hyperspace</h2>
          <h4>hyper storage for a hyper user</h4>
          <p>welcome to hyperspace. please install our chrome extension. once installed press the button below to make your first homepage</p>
          <button onClick={this.createHome}>make new home page</button>
        </div>
      </div>
    );
  }
}

export default Dashboard;