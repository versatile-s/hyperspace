import React, {Component} from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import IconButton from 'material-ui/IconButton/IconButton';
import IconMenu from 'material-ui/IconMenu';
import LogoutIcon from 'material-ui/svg-icons/navigation/cancel';
import store from '../../store';

class Logout extends Component {
  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout (e) {
    e.preventDefault();
    var context = this;
    fetch('/logout', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        browserHistory.push('/');
        store.dispatch({
          type: "GET_DATA", payload: []
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <div className="logout-knob">
         <IconButton onTouchTap={this.logout} style={{opacity:.2, width:50, left:12}}><LogoutIcon /></IconButton>
      </div>
    );
  }
}

export default Logout;