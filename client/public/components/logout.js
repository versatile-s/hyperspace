import React, {Component} from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

class Logout extends Component {
  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this);

  }

  logout (e) {
    e.preventDefault();
    var context = this;
    fetch('/logout', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        console.log('you have been logged out');
        browserHistory.push('/');
      }
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  render() {
    return (
      <div>
        <input type="button" value="logout" onClick={this.logout} />
      </div>
    );
  }
}

export default Logout;