import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import UserSignIn from './views/userSignIn.js';
import HyperspaceWorker from './views/hyperSpaceWorker.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

class ChromeApp extends Component {
  constructor (props) {
    super(props);
  
    this.state = {
      authenticated: false, 
      username: '',
      failedLogin: false
    };

    this.authenticateUser = this.authenticateUser.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
  }

  componentWillMount() {
    var context = this;

    // check if username is already stored in local storage
    chrome.storage.sync.get(['username'], function (storageObj) {
      if ( storageObj.username ) {
        var username = storageObj.username;
        context.setState({
          authenticated: true,
          username: username
        });
      }
    });
  }

  persistToLocalStorage() {
    var username = this.state.username;
    var context = this;

    chrome.storage.sync.set({'username': context.state.username}, function () {
      chrome.storage.sync.get(['username'], function(storageObj) {
        console.log('confirming that username is now in localStorage:', storageObj.username);
      });
    });
  }
  
  authenticateUser(e) {
    e.preventDefault();
    var context = this;

    var request = new XMLHttpRequest();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var authenticated = false;
    
    // second, true argument below means send async
    request.open('POST', 'http://127.0.0.1:3000/login', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(encodeURI('username=' + username + '&password=' + password));
    console.log('username and pass are', username + password);
   
    request.onreadystatechange = function () {
      console.log('status here is', this.status);
      console.log('RESPONSE TEXT IS', this.responseText);
      console.log('we received a change in status!');
      if (this.status === 200 && this.responseText === 'Login successful!') {
        context.setState({
          authenticated: true,
          username: username
        });
        console.log('authenticated val is now', context.state.authenticated);
        context.persistToLocalStorage();
      } else {
        console.log ('authenticated val is now', context.state.authenticated);
        context.setState({
          failedLogin: true
        });
      }
    };
  }

  logOutUser(e) {
    e.preventDefault();
    var context = this;

    context.setState({
      authenticated: false
    });

    chrome.storage.sync.set({'username': null});
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          {this.state.authenticated ? <HyperspaceWorker props={this.props} logOutUser={this.logOutUser.bind(this)} username={this.state.username}/> : <UserSignIn props={this.props} authenticateUser={this.authenticateUser.bind(this)}/>}
          <Snackbar
          open={this.state.failedLogin && !this.state.authenticated}
          message="Sorry, the login you entered is incorrect."
          autoHideDuration={2500}
          className="invalidPass"
        />
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<ChromeApp />, document.getElementById('content'));