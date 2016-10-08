import React, {Component} from 'react';
import store from '../../store';

class GoogleSignup extends Component {
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

  // The 'e' here should represent a google user
  signup (e) {
    e.preventDefault();
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    var context = this;
    fetch('/signup', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        //'Accept': 'application/json',
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
        console.log(err);
      });
    });
  }


  // render() {
  //   return (
  //     <Paper className="loginPaper" zDepth={5}>
  //       <h1>GOOGLE LOGIN</h1>
  //       <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
  //       <RaisedButton type="button" fullWidth="true" label="signup" onClick={this.signup} />
  //     </Paper>
  //   );
  // }
  render() {
    return (
      <h1>GOOGLE SIGNIN</h1>
    );
  }
}


export default GoogleSignup;