import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import UserSignIn from './views/userSignIn.js';
import HyperspaceWorker from './views/hyperSpaceWorker.js';


class ChromeApp extends Component {
  constructor (props) {
    super(props);
  
    this.state = {
      authenticated: false,
      username: ''
    };

    this.authenticateUser = this.authenticateUser.bind(this);
  }

  
  authenticateUser(e) {
    var xhr = new XMLHttpRequest();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var authenticated = false;

    var toSend = {username: username, password: password};
    
    // second, true argument below means send async
    xhr.open('POST', 'http://127.0.0.1:3000/login', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(encodeURI('username=' + username + '&password=' + password));
    // xhr.send(JSON.stringify({username: username, password: password}));

    console.log('username and pass are', username + password);
    xhr.onreadystatechange = function () {
      console.log('status here is', this.status);
      console.log('we received a change in status!');
      if (this.status === 200 ) {
        this.setState({
          authenticated: true,
          username: username
        });
        console.log('authenticated val is now', this.state.authenticated);
      } else {
        console.log ('authenticated val is now', this.state.authenticated);
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    authenticateUser();
  }

  render () {
    return (
      <div>
        <h1>WE R NOW RENDERING REACT IN R EXTENSION :) </h1>
        {this.state.authenticated ? <HyperspaceWorker/> : <UserSignIn props={this.props} />}
      </div>
    );
  }
}

ReactDOM.render(<ChromeApp />, document.getElementById('content'));



