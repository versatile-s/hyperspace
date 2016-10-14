import React, {Component} from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
//import GoogleSignup from './googleSignup';
import store from '../../store';

class Signup extends Component {
  constructor (props) {
    super(props);
    this.signup = this.signup.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state = {
      username: '',
      password: '',
      email: '',
      failedSignin: false
    };
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
        password: this.state.password,
        email: this.state.email
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

  handleEmail(email) {
    this.setState({
      email: email.target.value
    });
  }

  handleRequestClose () {
    this.setState({
      failedSignin:false
    });

  }

  render() {
    return (
      <div className="signUpWrapper">
        <div className="signUp row">
          <div className="featureRoll col-sm-8">
          <img className="feature" src={'../assets/hypr-feature.png'}/>
          </div>
          <div className="logIn col-sm-4">
             <Snackbar
                open={this.state.failedSignin}
                message={"I'm sorry "+this.state.username+", it looks like you are not the first " + this.state.username + "."}
                autoHideDuration={3000}
                onRequestClose={this.handleRequestClose}
              />
              <FlatButton label="signup" labelStyle={{textAlign: 'center', fontSize: 15}} style={{width: '100%'}} fullWidth="true" disabled={true}/>
              <input fullWidth="true" inputStyle={{textAlign: 'center'}} onChange={this.handleUsername} value={this.state.username} type="text" placeholder="username" />
              <input fullWidth="true" inputStyle={{textAlign: 'center'}} onChange={this.handleEmail} value={this.state.email} type="text" placeholder="email" />
              <input fullWidth="true" inputStyle={{textAlign: 'center'}} onChange={this.handlePass} value={this.state.password} type="password" placeholder="password" />
              <button className="signUp" onClick={this.signup}>Sign Up</button>
              <div style={{marginTop: 40} }class="alreadyMember">
                <p>Already a hyprspace member?</p>
                <Link to="/login"><button className="signUp">Log In</button></Link>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

//<GoogleSignup />
export default Signup;