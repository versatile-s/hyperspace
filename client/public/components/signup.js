import React, {Component} from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import store from '../../store';

class Signup extends Component {
  constructor (props) {
    super(props);
    this.signup = this.signup.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state = {
      username:'',
      password:'',
      failedSignin: false
    };
    store.dispatch({type: 'OPEN', payload: true});
  }

  signup (e) {
    e.preventDefault();
    var context = this;
    fetch('/signup', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then((response) => {
      response.text().then((res)=>{
        if (res === 'Login successful!') {
          store.dispatch({type: 'USERNAME_UPDATE', payload: context.state.username});
          store.dispatch({type: 'AUTH_SUCCESS', payload: true});
          context.setState({
            failedSignin: false
          });
          context.props.history.username = context.state.username;
          context.props.history.push('/dashboard');
        } else {
          store.dispatch({type: 'AUTH_FAIL', payload: false});
          context.setState({
            failedSignin: true
          });
        }
      });
    })
    .catch((error) => {
      error.text().then((err)=>{
        console.error(err);
      });
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

  handleRequestClose () {
    store.dispatch({type: 'CLOSE', payload: false});
  }

  render() {
    return (
      <div>
        <div>
          <Paper className="loginPaper" zDepth={5}>
           <Snackbar
              open={this.state.failedSignin}
              message={"I'm sorry "+this.state.username+", it looks like you are not the first " + this.state.username + "."}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
            <Snackbar
              open={store.getState().authenticated.authenticated && store.getState().open.open}
              message={"WELCOME TO HYPERSPACE " + store.getState().username.username}
              onRequestClose={this.handleRequestClose}
            />
            <FlatButton label="signup" labelStyle={{textAlign: 'center', fontSize: 15}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
            <TextField fullWidth="true" inputStyle={{textAlign: 'center'}} onChange={this.handleUsername} value={this.state.username} type="text" placeholder="username" />
            <TextField fullWidth="true" inputStyle={{textAlign: 'center'}} onChange={this.handlePass} value={this.state.password} type="password" placeholder="password" />
            <RaisedButton type="button" fullWidth="true" label="signup" onClick={this.signup} />
            <Link to="/login"><RaisedButton fullWidth="true" label="login page"/></Link>
          </Paper>
        </div>
      </div>
    );
  }
}

export default Signup;