import React, {Component} from 'react';


class UserSignIn extends Component {
  constructor (props) {
    super(props);

    this.state = {
      authenticated: false,
      username: ''
    };
  }

  componentWillMount() {
    console.log('mounted');
  }

  render () {
    return (
      <div className="authBody">
        <h2>Welcome to hyperspace. Please login.</h2>
        <form className="authForm">
          <input id="username" placeholder="your username"/>
          <input id="password" placeholder="password" type="password"/>
          <div className="submit">
            <button onClick={this.props.authenticateUser} className="submit">log in</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSignIn;