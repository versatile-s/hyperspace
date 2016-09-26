import React, {Component} from 'react';

class Signup extends Component {

  constructor (props) {
    super(props);
    this.signup = this.signup.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.state = {
      username:'',
      password:''
    };

  }
  
  signup (e) {
    e.preventDefault();
    fetch(this.props.route.url + '/signup', {
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
        console.log(res);
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


  render() {
    return (
      <div>

        <p>Signup Sissy</p>

        <input onChange={this.handleUsername} value= {this.state.username} type="text" placeholder= "username" />
        <input onChange={this.handlePass} value= {this.state.password} type="text" placeholder= "password"/>


        <input type="button" value="signup" onClick={this.signup} />
      </div>
    );
  }
}


export default Signup;