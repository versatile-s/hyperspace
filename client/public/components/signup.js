import React, {Component} from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

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
      failedSignup: false,
      open: true
    };
  }

  signup (e) {
    e.preventDefault();
    var context = this;
    fetch('/signup', {
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
      response.text().then((res)=>{
        if (res === 'User Created') {
          context.props.history.username = context.state.username;
          context.props.history.push('/dashboard');
        } else {
          context.setState({
            failedSignup: true
          });

        }
      });
    })
    .catch((error) => {
      error.text().then((err)=>{
        console.log(err);
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
    this.setState({
      open: false,
    });
  }

  render() {
    return (

      <div>

        <FlatButton label="H   Y   P   E   R   S   P   A   C   E" labelStyle={{textAlign: 'center', fontSize: 100}} style={{width: '100%', height: 70}} fullWidth="true" disabled={true}/>
        <div className="loginHome">
          <Paper className="loginPaper" zDepth={5}>
           <Snackbar
              open={this.state.failedSignup}
              message={"I'm sorry "+this.state.username+", it looks like you are not the first " + this.state.username + "."}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
            <Snackbar
              open={!this.state.failedSignup && this.state.open}
              message={"WELCOME TO HYPERSPACE " + this.state.username}
              
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