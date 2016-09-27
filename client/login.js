import React, {Component} from 'react';

class Login extends Component {
  constructor (props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.state = {
      username:'',
      password:'',
      failedLogin: false
    };
    this.login = this.login.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePass = this.handlePass.bind(this);
  }

  login (e) {
    e.preventDefault();
    var context = this;
    fetch(this.props.history.url + '/login', {
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
          context.props.history.push('/dashboard');
        } else {
          context.setState({
            failedLogin: true
          });
        }
        console.log(res);
      });
    })
    .catch((error) => {
      error.text().then((err) => {
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

  render() {
    return (
      <div>
        {this.state.failedLogin ? <p>The given information doesn't match our records, please enter information again.</p> : <p>Login Sissy</p>}
        <input onChange={this.handleUsername} value={this.state.username} type="text" placeholder="username" />
        <input onChange={this.handlePass} value={this.state.password} type="text" placeholder="password" />
        <input type="button" value="login" onClick={this.login} />
      </div>
    );
  }
}

export default Login;