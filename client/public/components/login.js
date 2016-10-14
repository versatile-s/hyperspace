import React, {Component} from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import store from '../../store';


class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      failedLogin: false
      // warp:false
    };
    // this.warpfield = this.warpfield.bind(this);
    // this.accelerate = this.accelerate.bind(this);
    this.login = this.login.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    
  }

  login (e) {
    e.preventDefault();
    var context = this;
    fetch('/login', {
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
      response.text().then((res) => {
        if (res === 'Login successful!') {
          store.dispatch({type: 'AUTH_SUCCESS', payload: true});
          store.dispatch({type: 'USERNAME_UPDATE', payload: context.state.username});
          context.setState({
            failedLogin: false
          });
          context.props.history.username = context.state.username;
          context.props.history.push('/'+context.state.username+'/home');
        } else {
          store.dispatch({type: 'AUTH_FAIL', payload: false});
          context.setState({
            failedLogin: true
          });
        }
      });
    })
    .catch((error) => {
      error.text().then((err) => {
        console.error(err);
      });
    });
  }

  handleRequestClose () {
    this.setState({
      failedLogin: false
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

  // warpfield() {
  //   if (this.state.warp) {
  //     new WarpSpeed("warpfield",{'speed':5, 'density':8});
  //   } else {
  //     new WarpSpeed("warpfield",{'speed':.2, 'density':8});
  //   }   
  // }

  // accelerate() {
  //   var context= this;
  //   if (this.state.warp) {
  //     this.setState({
  //       warp: false
  //     },function(){ 
  //       context.warpfield();
  //     });
  //   } else {
  //     this.setState({
  //       warp: true
  //     }, function(){ 
  //       context.warpfield();
  //     });
  //   }
  // }

  // componentDidMount(){
  //   this.warpfield();
  // }

  render() {
    return (
      <div className="loginWrapper">
        <div className="logIn row">
          <div className="featureRoll col-sm-8">
          <img className="feature" src={'../assets/hypr-feature.png'}/>
          </div>
          <div className="logIn col-sm-4">
             <Snackbar
                open={this.state.failedLogin}
                message={"I'm sorry "+this.state.username+", you must have goofed something up."}
                autoHideDuration={3000}
                onRequestClose={this.handleRequestClose}
              />
              <FlatButton label="LOGIN" labelStyle={{textAlign: 'center', fontSize: 15}} style={{width: '100%'}} disabled={true}/>
              <input onChange={this.handleUsername} value={this.state.username} type="text" placeholder="username" />
              <input onChange={this.handlePass} value={this.state.password} type="password" placeholder="password" />
              <button className="logIn" onClick={this.login}>Login </button>
              <Link to="/signup"><button className="signUp">Sign Up</button></Link>
              {/*<RaisedButton type="button" fullWidth="true" label="Login" onClick={this.login} />*/}
              {/*<Link to="/signup"><RaisedButton fullWidth="true" label="signup page"/></Link>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;