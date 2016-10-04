import React, {Component} from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      failedLogin: false,
      
    };
    this.login = this.login.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentWillMount () {
    const chromeExtensionId = 'ojfphmbcbojldkhanmckikiachebhnba';

    // Make a simple request:
    setInterval( 
      function () {
        chrome.runtime.sendMessage(chromeExtensionId, {message: 'message'},
        function (response) {
          console.log('sending MESSAGE');
          console.log('AND RESPONSE IS', response);
        });
      }, 2000);
  }

  login (e) {
    e.preventDefault();
    var context = this;
    fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then((response) => {
      response.text().then((res) => {
        if (res === 'Login successful!') {
          context.props.history.username = context.state.username;
          context.props.history.push('/'+context.state.username+'/home');
        } else {
          context.setState({
            failedLogin: true
          });
        }
      });
    })
    .catch((error) => {
      error.text().then((err) => {
        console.log(err);
      });
    });
  }

  handleRequestClose () {
    this.setState({
      open: false,
    });
  }

  handleUsername(name) {
    this.setState({
      username: name.target.value
    });
  }

  handlePass(pass) {
    this.setState({
      password: pass.target.value
    });
  }

  render() {
    return (
      <div>

        <FlatButton label="H   Y   P   E   R   S   P   A   C   E" labelStyle={{textAlign: 'center', fontSize: 100}} style={{width: '100%', height: 70}} fullWidth="true" disabled={true}/>
        <div className="loginHome">
          <Paper className="loginPaper" zDepth={5}>
           <Snackbar
              open={this.state.failedLogin}
              message={"I'm sorry "+this.state.username+", you must have goofed something up."}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
            <Snackbar
              open={!this.state.failedLogin && this.state.open}
              message={"WELCOME TO HYPERSPACE " + this.state.username}
              
              onRequestClose={this.handleRequestClose}
            />
            <FlatButton label="LOGIN" labelStyle={{textAlign: 'center', fontSize: 15}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
        

            <TextField fullWidth="true" inputStyle={{textAlign: 'center'}} onChange={this.handleUsername} value={this.state.username} type="text" placeholder="username" />
            <TextField fullWidth="true" inputStyle={{textAlign: 'center'}} onChange={this.handlePass} value={this.state.password} type="password" placeholder="password" />
            <RaisedButton type="button" fullWidth="true" label="Login" onClick={this.login} />
            <Link to="/signup"><RaisedButton fullWidth="true" label="signup page"/></Link>
          </Paper>  
        </div>
      </div>
    );
  }
}

export default Login;