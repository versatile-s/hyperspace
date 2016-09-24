import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      url: "http://localhost:3000"
    };
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  signup (e) {
    e.preventDefault();
    fetch(this.state.url + '/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  login (e) {
    e.preventDefault();
    fetch(this.state.url + '/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
    });
  }

  render () {
    return (
      <div>
        <input type="button" value="signup" onClick={this.signup} />
        <input type="button" value="login" onClick={this.login} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('content'));