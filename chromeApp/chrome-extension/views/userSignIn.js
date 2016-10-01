import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class UserSignIn extends Component {
  constructor (props) {
    super(props);

    this.state = {
      authenticated: false,
      username: ''
    };
  }

  componentWillMount() {

  }

  render () {
    return (
      <div className="authBody">
        <h2>Welcome to hyperspace. Please login.</h2>
        <form className="authForm">
          <TextField floatingLabelText="your username" id="username"/>
          <TextField floatingLabelText="password" id="password" />
          <div className="submit">
            <RaisedButton onClick={this.props.authenticateUser} className="submit" label="log in" primary={true}/>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSignIn;