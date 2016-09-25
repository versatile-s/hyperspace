import React, {Component} from 'react';

class Login extends Component {

  constructor (props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.state = {
      username:'',
      password:''
    };

  } 



  login (e) {
    e.preventDefault();
    fetch(this.props.route.url + '/login', {
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
      console.log(response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  handleUsername(name) {

    this.setState({
      username: name.target.value
    });
    console.log(this.state);

  }
  handlePass(pass) {

    this.setState({
      password: pass.target.value
    });
    console.log(this.state);

  }


  render() {
    return (
      <div>
        <p>Login Sissy</p>
        <form >
          <input onChange={this.handleUsername} value= {this.state.username} type="text" placeholder= "username" />
          <input onChange={this.handlePass} value= {this.state.password} type="text" placeholder= "password"/>
        </form>

        <input type="button" value="POST at /login" onClick={this.login}/>

      </div>
    );
  }
}


export default Login;