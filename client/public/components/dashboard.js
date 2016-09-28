import React, { Component } from 'react';

class Dashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: props.username
    };
  }

  render () {
    return (
      <div className="container">
        <div className="logo-space">
          <h2>hyperspace</h2>
          <h4>hyper storage for a hyper user</h4>
        </div>
      </div>
    );
  }
}

export default Dashboard;