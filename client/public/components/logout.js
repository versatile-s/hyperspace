import React, {Component} from 'react';
import { Link } from 'react-router';

class Logout extends Component {
  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this);

  }

  logout (e) {
    e.preventDefault();
    fetch('/logout', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        console.log('you have been logged out');
      }
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  // logout (e) {
  //   e.preventDefault();
  //   var context = this;
  //   fetch('/logout', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       username: this.state.username,
  //       password: this.state.password
  //     })
  //   }).then((response) => {
  //     response.text().then((res) => {
  //       if (res === 'Logout successful!') {
  //         context.props.history.username = context.state.username;
  //         context.props.history.push('/dashboard');
  //       } else {
  //         context.setState({
  //           failedLogin: true
  //         });
  //       }
  //     });
  //   })
  //   .catch((error) => {
  //     error.text().then((err) => {
  //       console.log(err);
  //     });
  //   });
  // }

  render() {
    return (
      <div>
        <input type="button" value="logout" onClick={this.logout} />
      </div>
    );
  }
}

export default Logout;